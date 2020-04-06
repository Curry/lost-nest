import { Injectable } from '@nestjs/common';
import { Strategy, InternalOAuthError } from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { IEveRawProfile } from './esi.model';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { use as refreshUse } from 'passport-oauth2-refresh';

@Injectable()
export class SSOStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      authorizationURL: 'https://login.eveonline.com/oauth/authorize',
      tokenURL: 'https://login.eveonline.com/oauth/token',
      clientID: '88f6459ddde5474f99feda81918307e1',
      clientSecret: 'dZLJrBJP2B6XWo1kGms2aWI8PgCnRGmGfxUkFpzw',
      scope:
        'esi-location.read_location.v1 esi-location.read_ship_type.v1 esi-ui.write_waypoint.v1 esi-location.read_online.v1',
      callbackURL: 'http://localhost:3000/auth/callback/',
    });
    refreshUse(this);
  }

  validate = (
    accessToken: string,
    refreshToken: string,
    profile: IEveRawProfile,
    done: any,
  ) => {
    console.log(accessToken);
    console.log(refreshToken)
    done(null, {name: "name"})
  };
  // this.authService
  //   .saveUser(accessToken, refreshToken, profile)
  //   .pipe(mergeMap(val => of(done(null, val))))
  //   .toPromise();

  userProfile = (
    accessToken: string,
    done: (err: any, result?: any, response?: any) => any,
  ) => {
    this._oauth2.useAuthorizationHeaderforGET(true);
    this._oauth2.get(
      'https://login.eveonline.com/oauth/verify',
      accessToken,
      (err, body: string) => {
        if (err) {
          return done(
            new InternalOAuthError('Failed to parse character profile.', err),
          );
        }
        const profile = JSON.parse(body) as IEveRawProfile;
        done(null, profile);
      },
    );
  };
}
