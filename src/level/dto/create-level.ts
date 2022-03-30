import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLevel {
  @Field()
  levelNumber: number;

  @Field()
  levelName: string;

  @Field()
  projectId: string;
}
