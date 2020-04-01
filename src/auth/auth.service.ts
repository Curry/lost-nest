import { Injectable } from '@nestjs/common';
import { requestNewAccessToken } from 'passport-oauth2-refresh';
import { defer, of, iif, throwError, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IEveRawProfile } from './models/esi.model';
import { PrismaService } from 'src/prisma/prisma.service';
//@ts-nocheck
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  // saveUser = (
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: IEveRawProfile,
  // ) => {};

  // saveUser = (
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: IEveRawProfile,
  // ) =>
  //   from(this.lostService.findCharacter(profile.CharacterID)).pipe(
  //     mergeMap(val =>
  //       from(
  //         this.lostService.saveCharacter(
  //           (val && val.id) || undefined,
  //           accessToken,
  //           refreshToken,
  //           profile,
  //         ),
  //       ),
  //     ),
  //   );

  // refreshToken = (refreshToken: string) =>
  //   defer(() =>
  //     of(
  //       requestNewAccessToken(
  //         'oauth2',
  //         refreshToken,
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         (err, accessToken, refreshToken, _result) =>
  //           iif(
  //             () => !err,
  //             this.lostService.updateCharAccessToken(refreshToken, accessToken),
  //             throwError(err),
  //           ),
  //       ),
  //     ),
  //   );
}
