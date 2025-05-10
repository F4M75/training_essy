import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  conversation: ConversationTable;
}

export interface ConversationTable {
  id: Generated<number>;
  user_id: string;
  created_at: ColumnType<Date | undefined, never>;
}

export type Conversation = Selectable<ConversationTable>;
export type NewConversation = Insertable<ConversationTable>;
export type ConversationUpdate = Updateable<ConversationTable>;
