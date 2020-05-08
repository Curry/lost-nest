import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Connection } from './connection.interface';
import { Connection as ConnectionModel } from './connection.model';
import { from } from 'rxjs';
import { tap, map, mergeMap, combineAll, pluck } from 'rxjs/operators';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel('Connection')
    private connectionModel: Model<Connection>,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
  ) {}

  getConnectionsByMapId = (mapId: number) =>
    from(this.connectionModel.find({ mapId }));

  syncChanges = (connection: ConnectionModel) =>
    from(
      this.connectionModel.findByIdAndUpdate(
        connection.id,
        connection,
        {
          upsert: true,
          setDefaultsOnInsert: true,
          new: true,
        },
      ),
    );

  saveConnection = (mapId: number, source: string, target: string) =>
    from(
      this.connectionModel.findOneAndUpdate(
        {
          mapId: mapId,
          source: Types.ObjectId(source),
          target: Types.ObjectId(target),
        },
        {
          mapId: mapId,
          source: Types.ObjectId(source),
          target: Types.ObjectId(target),
        },
        {
          upsert: true,
          setDefaultsOnInsert: true,
          new: true,
        },
      ),
    ).pipe(
      tap(connection => {
        this.generateStateChange('Add Connection', connection);
      }),
    );

  deleteConnectionsForNode = (nodeId: string) =>
    from(
      this.connectionModel.find({
        $or: [
          { source: Types.ObjectId(nodeId) },
          { target: Types.ObjectId(nodeId) },
        ],
      }),
    ).pipe(
      mergeMap(connections =>
        from(connections).pipe(
          map(connection =>
            from(
              this.connectionModel.findOneAndDelete({ _id: connection.id }),
            ).pipe(
              tap(connection => {
                this.generateStateChange('Delete Connection', connection);
              }),
            ),
          ),
          combineAll(),
        ),
      ),
    );

  deleteConnection = (source: string, target: string) =>
    from(
      this.connectionModel.findOneAndDelete({
        $or: [
          { source: Types.ObjectId(source), target: Types.ObjectId(target) },
          { source: Types.ObjectId(target), target: Types.ObjectId(source) },
        ],
      }),
    ).pipe(
      tap(connection => {
        this.generateStateChange('Delete Connection', connection);
      }),
    );

  generateStateChange = (type: string, connection: Connection) => {
    this.pubSub.publish(`sub.${connection.mapId}`, {
      type: `[Socket] ${type}`,
      connection: {
        id: connection.id,
        mapId: connection.mapId,
        source: connection.source,
        target: connection.target,
        createdAt: connection.createdAt,
        updatedAt: connection.updatedAt,
      },
    });
  };
}
