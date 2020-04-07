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

  findCharacter = (id: number) =>
    from(this.characterModel.findOne({ characterId: id }));

  saveCharacter = (character: CharacterInput) =>
    from(
      this.characterModel.updateOne(
        { characterId: character.characterId },
        character,
        { upsert: true },
      ),
    ).pipe(map(() => character));

  checkToken = (id: number) =>
    this.findCharacter(id).pipe(
      map(
        val =>
          val.esiAccessToken === '' || val.esiAccessTokenExpires < new Date(),
      ),
    );

  updateAccessToken = (accessToken: string, refreshToken: string) =>
    from(
      this.characterModel.updateOne(
        { esiRefreshToken: refreshToken },
        {
          esiAccessToken: accessToken,
          esiRefreshToken: refreshToken,
          esiAccessTokenExpires: new Date(
            new Date().getTime() + 30 * 60000,
          ).toUTCString(),
        },
      ),
    );
}
