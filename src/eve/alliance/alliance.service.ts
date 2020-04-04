import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alliance } from './alliance.interface';
import { from } from 'rxjs';

@Injectable()
export class AllianceService {
  constructor(
    @InjectModel('Alliance')
    private allianceModel: Model<Alliance>,
  ) {}

  getAllianceById = (id: number) => from(this.allianceModel.findOne({ allianceId: id }))
}
