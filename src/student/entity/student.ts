import { Project } from './../../project/entity/project';
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
  fatherName: string;

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

  @ManyToOne(() => Project, (project) => project.students)
  @Field(() => Project)
  project: Project;

  @Column({ nullable: true })
  @Field({ nullable: true })
  projectId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  levelId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  divisionId: string;
}
