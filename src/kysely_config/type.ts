import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  converstation: ConversationTable;
}

export interface ConversationTable {
  id: Generated<number>;

  user_id: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Conversation = Selectable<ConversationTable>;
export type NewConversation = Insertable<ConversationTable>;
export type ConversationUpdate = Updateable<ConversationTable>;
