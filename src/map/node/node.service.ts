import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Node } from './node.interface';
import { from } from 'rxjs';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { tap } from 'rxjs/operators';

@Injectable()
export class NodeService {
  constructor(
    @InjectModel('Node')
    private nodeModel: Model<Node>,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
  ) {
    // this.nodeModel.findOne().exec().then(val => console.log(val))
  }

  asyncIterator = (mapId: number) => this.pubSub.asyncIterator(`node.${mapId}`);

  saveNode = (mapId: number, systemId: number) =>
    from(
      this.nodeModel.findOneAndUpdate(
        {
          mapId: mapId,
          systemId: systemId,
        },
        {
          mapId: mapId,
          systemId: systemId,
        },
        {
          upsert: true,
          setDefaultsOnInsert: true,
          new: true,
        },
      ),
    ).pipe(tap(node => this.pubSub.publish(`node.${mapId}`, node)));

  moveNode = (id: string, posX: number, posY: number) =>
    from(
      this.nodeModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          posX: posX,
          posY: posY,
        },
        {
          new: true,
        },
      ),
    );

  findNodesByMapId = (mapId: number) =>
    from(this.nodeModel.find({ mapId: mapId }));

  findNodeBySystem = (systemId: number) =>
    from(this.nodeModel.findOne({ systemId: systemId }));

  deleteNode = (id: string) => from(this.nodeModel.findOneAndDelete({ _id: id}));

  deleteNodeBySystem = (systemId: number) => from(this.nodeModel.findOneAndDelete({ systemId }));
}
