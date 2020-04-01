import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SSOStrategy } from './sso.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, SSOStrategy, PrismaService]
})
export class AuthModule {}
