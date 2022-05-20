import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AbsentArgs {
  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  approved?: boolean;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  fromDate: Date;

  @Field({ nullable: true })
  toDate: Date;
}
