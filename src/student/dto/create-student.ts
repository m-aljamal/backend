import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudent {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  divisionId: string;

  @Field()
  levelId: string;
}
