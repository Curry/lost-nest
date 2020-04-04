import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Corporation } from './corporation.interface';
import { from } from 'rxjs';
import { CorporationInput } from './corporation.input';
import { map } from 'rxjs/operators';

@Injectable()
export class CorporationService {
  constructor(
    @InjectModel('Corporation')
    private corporationModel: Model<Corporation>,
  ) {}

  getCorporationById = (id: number) =>
    from(this.corporationModel.findOne({ corporationId: id }));

  getCorporationByName = (name: string) =>
    from(
      this.corporationModel.findOne({
        corporationName: { $regex: new RegExp(name, 'i') },
      }),
    );

  saveCorporation = (corp: CorporationInput) =>
    from(
      this.corporationModel.updateOne(
        { corporationId: corp.corporationId },
        corp,
        { upsert: true },
      ),
    ).pipe(map(val => val.ok));
}
