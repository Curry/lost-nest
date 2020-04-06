import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SSOStrategy } from './sso.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthService, SSOStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
