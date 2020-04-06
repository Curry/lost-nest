import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { mergeMap } from 'rxjs/operators';
import { iif, of, throwError } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate = (username: string, password: string) =>
    this.authService
      .validateUser(username, password)
      .pipe(
        mergeMap(user =>
          iif(() => !!user, of(user), throwError(new UnauthorizedException())),
        ),
      ).toPromise();
}
