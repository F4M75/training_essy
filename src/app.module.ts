import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConversationModule } from './modules/conversation/conversation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { KyselyModule } from 'nestjs-kysely';
import { Pool } from 'pg';
import { Dialect, PostgresDialect } from 'kysely';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    KyselyModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          dialect: new PostgresDialect({
            pool: new Pool({
              database: dbConfig.name,
              host: dbConfig.host,
              user: dbConfig.user,
              password: dbConfig.password,
              port: parseInt(dbConfig.port, 10),
              max: 10,
            }),
          }) as Dialect,
        };
      },
    }),
    ConversationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
