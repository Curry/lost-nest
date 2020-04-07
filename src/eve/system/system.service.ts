import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { System } from './system.interface';
import { Class } from '../common/enums/class.enum';
import { Effect } from '../common/enums/effect.enum';
import { map, mergeMap, combineAll } from 'rxjs/operators';
import { EsiService } from '../esi/esi.service';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel('System')
    private systemModel: Model<System>,
    private esiService: EsiService,
  ) {}

  getLocation = (id: number) =>
    this.esiService
      .accessEsiWithAuth<any>(`characters/${id}/location`, id)
      .pipe(mergeMap(data => this.getSystemById(data.solar_system_id)));

  getSystemById = (id: number) =>
    from(this.systemModel.findOne({ _id: id.toString() }));

  getSystemByName = (name: string) =>
    from(this.systemModel.findOne({ systemName: name }));

  getSystemsRegex = (name: string) =>
    from(
      this.systemModel.find({ systemName: { $regex: new RegExp(name, 'i') } }),
    ).pipe(map(val => val.map(sys => sys.systemName)));

  getSystems = (sourceClass: Class, statics: Class[], effect: Effect) => {
    return this.systemModel.find({
      ...(sourceClass !== null && { class: sourceClass }),
      ...(effect !== null && { effect: effect }),
      ...(statics.length > 0 && { staticTargets: { $all: statics } }),
    });
  };

  getRoute = (source: number, dest: number) =>
    this.esiService.getRoute(source, dest).pipe(
      mergeMap(val =>
        from(val).pipe(
          map(system =>
            this.getSystemById(system)
          ),
          combineAll(),
        ),
      ),
    );
}
