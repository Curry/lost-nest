import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { System } from './interfaces/system.interface';
import { Static } from './interfaces/static.interface';

@Injectable()
export class SystemService {
    constructor(
        @InjectModel('System')
        private systemModel: Model<System>
    ) {}

    getSystems = () => from(this.systemModel.find())

    getSystemById = (id: number) => from(this.systemModel.findOne({ id: id }))

    getSystemsByName = (name: string) => from(this.systemModel.find({ systemName: { $regex: new RegExp(name, 'i') }}))

    getSystemByStatic = (name: string) => from(this.systemModel.find({ statics: { name: name } as Static }))
}
