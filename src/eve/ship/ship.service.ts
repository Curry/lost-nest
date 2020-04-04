import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ship } from './ship.interface';
import { from } from 'rxjs';

@Injectable()
export class ShipService {
  constructor(
    @InjectModel('Ship')
    private shipModel: Model<Ship>,
  ) {}

  getShipByName = (name: string) =>
    from(this.shipModel.findOne({ name: name }));
}
