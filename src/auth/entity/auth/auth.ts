import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Auth {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  token: string;
}
