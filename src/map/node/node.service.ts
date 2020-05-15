import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Node } from './node.interface';
import { from } from 'rxjs';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { tap } from 'rxjs/operators';
import { NodeInput } from './node.input';

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
          mapId,
          systemId,
        },
        {
          mapId,
          systemId,
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

  syncChanges = (node: NodeInput) =>
    from(
      this.nodeModel.findByIdAndUpdate(node.id, node, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true,
      }),
    );

  moveNode = (id: string, posX: number, posY: number) =>
    from(
      this.nodeModel.findByIdAndUpdate(id,
        {
          posX,
          posY,
        },
        {
          new: true,
        },
      ),
    ).pipe(
      tap(node => {
        this.generateStateChange('Move Node', node);
      }),
    );

  findNodesByMapId = (mapId: number) => from(this.nodeModel.find({ mapId }));

  findNodeBySystem = (systemId: number) =>
    from(this.nodeModel.findOne({ systemId }));

  deleteNode = (id: string) =>
    from(this.nodeModel.findByIdAndDelete(id)).pipe(
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

  generateStateChange = (
    type: string,
    { id, mapId, systemId, system, alias, posX, posY }: Node,
  ) => {
    this.pubSub.publish(`sub.${mapId}`, {
      type: `[Socket] ${type}`,
      props: JSON.stringify({
        id,
        mapId,
        systemId,
        system,
        alias,
        posX,
        posY,
      }),
    });
  };
}
