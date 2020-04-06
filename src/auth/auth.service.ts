import { Injectable } from '@nestjs/common';
import { requestNewAccessToken } from 'passport-oauth2-refresh';
import { defer, of, iif, throwError } from 'rxjs';
import { IEveRawProfile } from './esi.model';
import { CharacterService } from 'src/eve/character/character.service';
import { CharacterInput } from 'src/eve/character/character.input';
import { UserService } from 'src/eve/user/user.service';
import { mergeMap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/eve/user/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private charService: CharacterService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser = (username: string, password: string) => {
    return this.userService
      .findUser(username)
      .pipe(
        mergeMap(user =>
          iif(() => user && user.password === password, of(user), of(null)),
        ),
      );
  };

  async login(user: User) {
    return {
      token: this.jwtService.sign({ username: user.username, sub: user._id }),
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

  refreshToken = (refreshToken: string) =>
    defer(() =>
      of(
        requestNewAccessToken(
          'oauth2',
          refreshToken,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (err, accessToken, refreshToken, _result) =>
            iif(
              () => !err,
              this.charService.updateAccessToken(accessToken, refreshToken),
              throwError(err),
            ),
        ),
      ),
    );
}
