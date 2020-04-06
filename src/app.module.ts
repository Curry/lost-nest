import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import * as autoPopulate from 'mongoose-autopopulate';
import { EveModule } from './eve/eve.module';
import { DateScalar } from './common/scalars/date.scalar';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/lost', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      connectionFactory: connection => {
        connection.plugin(autoPopulate);
        return connection;
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
    EveModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    DateScalar,
  ],
})
export class AppModule {}
