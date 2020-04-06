import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.interface';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel('Character')
    private characterModel: Model<Character>,
  ) {}
}
