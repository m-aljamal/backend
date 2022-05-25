import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArchive {
  @Field()
  name: string;

  @Field()
  projectId: string;
}
