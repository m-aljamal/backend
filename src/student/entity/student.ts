import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
import { Level } from 'src/level/entity/level';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  phone: string;

  @ManyToOne(() => Level, (level) => level.students)
  @Field(() => Level)
  level: Level;

  @ManyToOne(() => Division, (division) => division.students)
  @Field(() => Division)
  division: Division;
}
