// conversation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Kysely } from 'kysely';
import {
  Conversation,
  Database,
  NewConversation,
} from '../../kysely_config/type';
// adjust path

@Injectable()
export class ConversationService {
  constructor(
    @InjectKysely()
    private readonly db: Kysely<Database>,
  ) {}

  async startConversation(): Promise<Conversation> {
    const [conversation] = await this.db
      .insertInto('conversation')
      .values({
        user_id: 'id1',
      } satisfies NewConversation)
      .returningAll()
      .execute();

    return conversation;
  }
}
