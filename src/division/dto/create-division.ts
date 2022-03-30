import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDivision {
  @Field()
  divisionNumber: number;

  @Field()
  divisionName: string;

  @Field()
  levelId: string;
}
