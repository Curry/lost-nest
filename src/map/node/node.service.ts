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
  ) {}

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
    ).pipe(
      tap(node => {
        this.generateStateChange('Add Node', node);
      }),
    );

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
    ).pipe(
      tap(node => {
        this.generateStateChange('Move Node', node);
      })
    );

  findNodesByMapId = (mapId: number) =>
    from(this.nodeModel.find({ mapId }));

  findNodeBySystem = (systemId: number) =>
    from(this.nodeModel.findOne({ systemId }));

  deleteNode = (id: string) =>
    from(this.nodeModel.findOneAndDelete({ _id: id })).pipe(
      tap(node => {
        this.generateStateChange('Delete Node', node);
      }),
    );

  deleteNodeBySystem = (systemId: number) =>
    from(this.nodeModel.findOneAndDelete({ systemId })).pipe(
      tap(node => {
        this.generateStateChange('Delete Node', node);
      }),
    );

  generateStateChange = (type: string, node: Node) => {
    this.pubSub.publish(`sub.${node.mapId}`, {
      type: `[Socket] ${type}`,
      node: {
        id: node.id,
        mapId: node.mapId,
        systemId: node.systemId,
        alias: node.alias,
        posX: node.posX,
        posY: node.posY,
      },
    });
  };
}
