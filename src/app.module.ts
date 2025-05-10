import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConversationModule } from './modules/conversation/conversation.module';
import { ConfigModule } from '@nestjs/config';

import { KyselyModule } from 'nestjs-kysely';
import { Pool } from 'pg';
import { Dialect, PostgresDialect } from 'kysely';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    KyselyModule.forRoot({
      dialect: new PostgresDialect({
        pool: new Pool({
          database: process.env.DATABASE_NAME,
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          port: process.env.DATABASE_PORT,
          max: 10,
        }),
      }) as Dialect,
    }),
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
