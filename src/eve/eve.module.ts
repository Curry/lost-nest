import { Module } from '@nestjs/common';
import { SystemResolver } from './resolvers/system.resolver';
import { EveService } from './eve.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CorporationResolver } from './resolvers/corporation.resolver';
import { CorporationService } from './services/corporation.service';

@Module({
  providers: [
    SystemResolver,
    CorporationResolver,
    PrismaService,
    EveService,
    CorporationService,
  ],
})
export class EveModule {}
