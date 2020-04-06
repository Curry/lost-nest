import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.interface';
import { from } from 'rxjs';
import { CharacterInput } from './character.input';
import { map } from 'rxjs/operators';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel('Character')
    private characterModel: Model<Character>,
  ) {}

  saveCharacter = (character: CharacterInput) =>
    from(
      this.characterModel.updateOne(
        { characterId: character.characterId },
        character,
        { upsert: true },
      ),
    ).pipe(map(() => character));

  updateAccessToken = (accessToken: string, refreshToken: string) =>
    from(
      this.characterModel.updateOne(
        { esiRefreshToken: refreshToken },
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      ),
    );
}
