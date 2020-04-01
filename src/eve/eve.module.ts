import { Module } from '@nestjs/common';
import { SystemResolver } from './resolvers/system.resolver';
import { EveService } from './eve.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SystemResolver, PrismaService, EveService]
})
export class EveModule {}
