import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => Conversation)
  startConversation() {
    return this.conversationService.startConversation();
  }

  @Query(() => String)
  hello(): string {
    return 'Hello from GraphQL!';
  }
}
