import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllianceService } from './alliance.service';
import { AllianceResolver } from './alliance.resolver';
import { AllianceSchema } from './alliance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Alliance',
        schema: AllianceSchema,
        collection: 'alliances'
      },
    ]),
  ],
  exports: [AllianceService],
  providers: [AllianceService, AllianceResolver]
})
export class AllianceModule {}
