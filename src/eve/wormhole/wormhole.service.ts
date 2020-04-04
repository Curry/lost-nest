import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { Wormhole } from './wormhole.interface';
import { Class } from '../common/enums/class.enum';

@Injectable()
export class WormholeService {
  constructor(
    @InjectModel('Wormhole')
    private wormholeModel: Model<Wormhole>,
  ) {}

  getWormholeByName = (name: string) =>
    from(this.wormholeModel.findOne({ name: name }));

  getWormholesBySource = (sourceClass: Class) =>
    from(
      this.wormholeModel
        .find({ sourceClasses: { $eq: sourceClass } })
        .sort({ targetClass: 1 }),
    );

  getWormholesByTargetClass = (names: Class[]) =>
    from(this.wormholeModel.find({ targetClass: { $in: names } }));
}
