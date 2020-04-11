import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SSOStrategy } from './strategies/sso.strategy';
import { AuthController } from './auth.controller';
import { CharacterModule } from 'eve/character/character.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    CharacterModule,
    JwtModule.register({
      secret: 'potato',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, SSOStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
