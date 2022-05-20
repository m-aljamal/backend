import { Project } from './../../project/entity/project';
import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
import { Level } from 'src/level/entity/level';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
 import { Stuabsent } from 'src/stuabsent/enity/stuabsent';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  fatherName: string;

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

  @OneToMany(() => Stuabsent, (stuabsent) => stuabsent.student)
  @Field(() => [Stuabsent])
  absents: Stuabsent[];
}
