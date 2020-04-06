import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('oauth2'))
  @Get('/sso')
  login() {
    return;
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get('/callback')
  callback(@Res() res: Response) {
    res.redirect('http://localhost:4200/');
  }
}
