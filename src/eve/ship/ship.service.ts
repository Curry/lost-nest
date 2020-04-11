import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ship } from './ship.interface';
import { from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { EsiService } from '../esi/esi.service';

@Injectable()
export class ShipService {
  constructor(
    @InjectModel('Ship')
    private shipModel: Model<Ship>,
    private esiService: EsiService,
  ) {}

  getShip = (id: number) =>
    this.esiService
      .accessEsiWithAuth<any>(`characters/${id}/ship`, id)
      .pipe(
        mergeMap(data => this.getShipById(data.ship_type_id, data.ship_name)),
      );

  getShipByName = (name: string) =>
    from(this.shipModel.findOne({ name: name }));

  getShipById = (id: number, alias: string) =>
    from(this.shipModel.findOne({ _id: id.toString() })).pipe(
      map(val => ({ ...val, alias })),
    );
}
