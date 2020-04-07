import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterService } from './character.service';
import { CharacterResolver } from './character.resolver';
import { CharacterSchema } from './character.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Character',
        schema: CharacterSchema,
        collection: 'characters',
      },
    ]),
  ],
  exports: [CharacterService],
  providers: [CharacterService, CharacterResolver],
})
export class CharacterModule {}
