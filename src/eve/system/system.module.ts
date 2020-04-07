import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemResolver } from './system.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemSchema } from './system.schema';
import { EsiModule } from '../esi/esi.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'System',
        schema: SystemSchema,
        collection: 'systems',
      },
    ]),
    EsiModule,
  ],
  exports: [SystemService],
  providers: [SystemService, SystemResolver],
})
export class SystemModule {}
