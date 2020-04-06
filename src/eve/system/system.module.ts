import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemResolver } from './system.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemSchema } from './system.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'System',
        schema: SystemSchema,
        collection: 'systems',
      },
    ]),
  ],
  exports: [SystemService],
  providers: [SystemService, SystemResolver],
})
export class SystemModule {}
