import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AdminDto {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
