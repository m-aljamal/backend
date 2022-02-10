import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { Column } from 'typeorm';

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(Sort, {
  name: 'Sort',
});

@ArgsType()
export class ProjectArgs {
  @Field(()=> Sort, { nullable: true })
  sortBy?: Sort;
}
