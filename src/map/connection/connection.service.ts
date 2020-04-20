import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Connection } from './connection.interface';
import { from } from 'rxjs';
import { tap, map, mergeMap, combineAll } from 'rxjs/operators';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel('Connection')
    private connectionModel: Model<Connection>,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
  ) {}

  asyncAddIterator = (mapId: number) => this.pubSub.asyncIterator(`connection.add.${mapId}`);

  asyncRemoveIterator = () => this.pubSub.asyncIterator(`connection.remove`);

  getConnectionsByMapId = (mapId: number) =>
    from(this.connectionModel.find({ mapId: mapId }));

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
    ).pipe(tap(connection => this.pubSub.publish(`connection.add.${mapId}`, connection)));

  deleteConnectionsForNode = (nodeId: string) =>
    from(this.connectionModel.find({
      $or: [
        { source: Types.ObjectId(nodeId) },
        { target: Types.ObjectId(nodeId) },
      ],
    })).pipe(
      mergeMap(connections => from(connections).pipe(
        tap(val => this.pubSub.publish('connection.remove', val.id)),
        map(connection => this.connectionModel.findOneAndDelete(connection.id)),
        combineAll(),
      ))
  )

  deleteConnection = (mapId: number, source: string, target: string) =>
    from(
      this.connectionModel.findOneAndDelete({
        $or: [
          { source: Types.ObjectId(source), target: Types.ObjectId(target) },
          { source: Types.ObjectId(target), target: Types.ObjectId(source) },
        ],
      }),
    ).pipe(tap(val => this.pubSub.publish('connection.remove', val.id)));
}
