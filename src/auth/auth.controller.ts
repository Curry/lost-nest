import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('oauth2'))
  @Get('/esi')
  esi() {
    return;
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get('/esi/callback')
  callback(@Res() res: Response) {
    res.redirect(`http://localhost:4200/?token=${res.req.user['token']}`);
  }
}
