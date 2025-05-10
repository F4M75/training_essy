import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Conversation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => Date)
  createdAt: Date;
}
