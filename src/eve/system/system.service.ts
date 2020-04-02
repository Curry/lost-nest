import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { System } from './interfaces/system.interface';
import { Static } from './interfaces/static.interface';
import { SystemArgs } from './inputs/systemArgs.input';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel('System')
    private systemModel: Model<System>,
    @InjectModel('Static')
    private staticModel: Model<Static>,
  ) {}

  getSystems = () => from(this.systemModel.find());

  getSystemById = (id: number) => from(this.systemModel.findOne({ id: id }));

  getSystemsByName = (name: string) =>
    from(
      this.systemModel.find({ systemName: { $regex: new RegExp(name, 'i') } }),
    );

  getSystemsByStatics = (name: SystemArgs) =>
    from(this.staticModel.find({ targetClass: { $in: name.statics } })).pipe(
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
