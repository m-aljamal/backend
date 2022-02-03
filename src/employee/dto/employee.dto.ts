import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeDto {
  @Field()
  name: string;

  @Field()
  salary: number;

  @Field()
  projectId: string;
}
