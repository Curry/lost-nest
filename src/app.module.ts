import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { EveModule } from './eve/eve.module';
import { AuthModule } from './auth/auth.module';
import { DateScalar } from './common/scalars/date.scalar';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: './src/schema.graphql',
        debug: true,
        playground: true,
        context: ({ req }) => ({ req })
      }),
      inject: [ConfigService]
    }),
    EveModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DateScalar],
})
export class AppModule {}
