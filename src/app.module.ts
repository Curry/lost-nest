import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { DateScalar } from './common/scalars/date.scalar';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemModule } from './eve/system/system.module';
import * as autoPopulate from 'mongoose-autopopulate'
import { WormholeModule } from './eve/wormhole/wormhole.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/lost', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      connectionFactory: (connection) => {
        connection.plugin(autoPopulate);
        return connection;
      }
    }),
    GraphQLModule.forRoot({
      autoSchemaFile:  'schema.graphql',
      context: ({ req }) => ({ req })
    }),
    // AuthModule,
    SystemModule,
    WormholeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
