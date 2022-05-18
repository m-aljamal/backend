import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AbsentArgs {
  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  approved?: boolean;

  @Field({ nullable: true })
  studentName: string;

  @Field({ nullable: true })
  employeeName: string;
}
