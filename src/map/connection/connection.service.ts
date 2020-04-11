import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from './connection.interface';
import { NodeService } from '../node/node.service';
import { forkJoin, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel('Connection')
    private connectionModel: Model<Connection>,
    private nodeService: NodeService,
  ) {}

  getConnectionsByMapId = (mapId: number) =>
    from(this.connectionModel.find({ mapId: mapId }));

  saveConnection = (mapId: number, source: number, target: number) =>
    forkJoin([
      this.nodeService.findNodeBySystem(source),
      this.nodeService.findNodeBySystem(target),
    ]).pipe(
      map(([source, target]) => ({ source: source._id, target: target._id })),
      mergeMap(val =>
        from(
          this.connectionModel.findOneAndUpdate(
            {
              mapId: mapId,
              source: val.source,
              target: val.target,
            },
            {
              mapId: mapId,
              source: val.source,
              target: val.target,
            },
            {
              upsert: true,
              setDefaultsOnInsert: true,
            },
          ),
        ),
      ),
    );
}
