import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SSOStrategy } from './strategies/sso.strategy';
import { AuthController } from './auth.controller';
import { CharacterModule } from 'src/eve/character/character.module';
import { UserModule } from 'src/eve/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    CharacterModule,
    UserModule,
    JwtModule.register({
      secret: 'potato',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, SSOStrategy, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
