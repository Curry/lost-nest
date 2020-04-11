import { Injectable } from '@nestjs/common';
import { requestNewAccessToken } from 'passport-oauth2-refresh';
import { Observable, Observer } from 'rxjs';
import { IEveRawProfile } from '../eve/esi/esi.model';
import { CharacterService } from 'eve/character/character.service';
import { CharacterInput } from 'eve/character/character.input';
import { JwtService } from '@nestjs/jwt';
import { mergeMap } from 'rxjs/operators';
@Injectable()
export class AuthService {
  constructor(
    private charService: CharacterService,
    private jwtService: JwtService,
  ) {}

  login(character: CharacterInput) {
    return {
      token: this.jwtService.sign({
        hash: character.ownerHash,
        id: character.characterId,
      }),
    };
  }

  saveUser = (
    accessToken: string,
    refreshToken: string,
    profile: IEveRawProfile,
  ) =>
    this.charService.saveCharacter({
      characterId: profile.CharacterID,
      name: profile.CharacterName,
      ownerHash: profile.CharacterOwnerHash,
      esiAccessToken: accessToken,
      esiAccessTokenExpires: new Date(`${profile.ExpiresOn}Z`),
      esiRefreshToken: refreshToken,
      esiScopes: profile.Scopes,
    } as CharacterInput);

  refreshToken = (id: number) =>
    this.charService.findCharacter(id).pipe(
      mergeMap(char =>
        new Observable(
          (
            observer: Observer<{ accessToken: string; refreshToken: string }>,
          ) => {
            requestNewAccessToken(
              'oauth2',
              char.esiRefreshToken,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_err, accessToken, refreshToken, _result) => {
                observer.next({
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                });
                observer.complete();
              },
            );
          },
        ).pipe(
          mergeMap(val =>
            this.charService.updateAccessToken(
              val.accessToken,
              val.refreshToken,
            ),
          ),
        ),
      ),
    );
}
