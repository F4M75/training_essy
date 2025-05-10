// kysely.config.ts
import { defineConfig } from 'kysely-ctl';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import configuration from '../src/config/configuration';

// Load environment variables
dotenv.config();

// Use same config structure as AppModule
const config = configuration();
const db = config.database;

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: db.name,
      host: db.host,
      user: db.user,
      password: db.password,
      port: db.port,
    }),
  }),
  migrations: {
    migrationFolder: 'migrations',
  },
  seeds: {
    seedFolder: 'seeds',
  },
});
