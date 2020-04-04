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

  getWormholesBySource = (sourceClass: Class) =>
    from(
      this.wormholeModel
        .find({ sourceClasses: { $eq: sourceClass } })
        .sort({ targetClass: 1 }),
    );

  getWormholesByName = (names: Class[]) =>
    from(this.wormholeModel.find({ targetClass: { $in: names } }));
}
