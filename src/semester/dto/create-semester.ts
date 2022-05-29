import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSemester {
  @Field()
  name: string;

  // @Field()
  // startDate: Date;

  // @Field()
  // endDate: Date;

  @Field()
  archiveId: string;
}
