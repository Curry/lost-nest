import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { System } from './system.interface';
import { SystemArgs } from '../common/inputs/systemArgs.input';
import { WormholeService } from '../wormhole/wormhole.service';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel('System')
    private systemModel: Model<System>,
    private wormholeService: WormholeService,
  ) {}

  getSystemById = (id: number) => from(this.systemModel.findOne({ id: id }));

  getSystems = (name: SystemArgs) =>
    this.wormholeService.getWormholesByName(name.statics).pipe(
      map(val => ({
        ...(name.id && { _id: name.id.toString() }),
        ...(name.systemName && {
          systemName: { $regex: new RegExp(name.systemName, 'i') },
        }),
        ...(name.effect && { effect: name.effect }),
        ...(name.class && { class: name.class }),
        ...(val.length !== 0 && { statics: { $in: val.map(stat => stat.id) } }),
      })),
      mergeMap(val => this.systemModel.find(val)),
    );
}
