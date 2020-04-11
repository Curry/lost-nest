import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Node } from './node.interface';
import { from } from 'rxjs';

@Injectable()
export class NodeService {
  constructor(
    @InjectModel('Node')
    private nodeModel: Model<Node>,
  ) {
    // this.nodeModel.findOne().exec().then(val => console.log(val))
  }

  findNodesByMapId = (mapId: number) =>
    from(this.nodeModel.find({ mapId: mapId }));

  findNodeBySystem = (systemId: number) =>
    from(this.nodeModel.findOne({ system: systemId }));
}
