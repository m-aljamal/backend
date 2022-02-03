import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class DailyDiscount {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamptz' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes: string;

  @Field()
  @Column({ type: 'numeric' })
  discount: number;
}
