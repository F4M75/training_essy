// migrations/<timestamp>_create_conversation_table.ts
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('conversation')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('conversation').execute();
}
