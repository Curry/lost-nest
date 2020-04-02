import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemResolver } from './system.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemSchema } from './schemas/system.schema';
import { StaticSchema } from './schemas/static.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'System',
        schema: SystemSchema,
        collection: 'systems'
      },
      {
        name: 'Static',
        schema: StaticSchema,
        collection: 'statics'
      }
    ])
  ],
  providers: [SystemService, SystemResolver]
})
export class SystemModule {}
