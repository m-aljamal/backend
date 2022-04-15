import { Project } from './../../project/entity/project';
import { Division } from 'src/division/entity/division';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from 'src/student/entity/student';
import { Employee } from 'src/employee/entity/employee';

@ObjectType()
@Entity()
export class Level {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Number)
  @Column()
  levelNumber: Number;

  @Field()
  @Column()
  levelName: string;

  @OneToMany(() => Division, (division) => division.level)
  @Field(() => [Division], { nullable: true })
  divisions: Division[];

  @OneToMany(() => Student, (student) => student.level)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToOne(() => Project, (project) => project.levels)
  @Field(() => Project, { nullable: true })
  project: Project;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  projectId: string;

  @ManyToMany(() => Employee, (employee) => employee.levels)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];
}
