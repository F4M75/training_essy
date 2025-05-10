import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth-guard';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Conversation)
  startConversation() {
    return this.conversationService.startConversation();
  }

  @Query(() => String)
  hello(): string {
    return 'Hello from GraphQL!';
  }
}
