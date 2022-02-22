import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectDto {
  @Field()
  nameAr: string;

  @Field()
  nameEn: string;

  @Field()
  type: string;
}
