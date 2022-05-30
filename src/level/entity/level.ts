import { Project } from './../../project/entity/project';
import { Division } from 'src/division/entity/division';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from 'src/student/entity/student';
import { Employee } from 'src/employee/entity/employee';
import { Semester } from 'src/semester/entity/semester';

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

  @ManyToMany(() => Employee, (employee) => employee.levels)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @ManyToMany(() => Semester, (semester) => semester.levels, {
    cascade: true,
  })
  @Field(() => [Semester], { nullable: true })
  @JoinTable({
    name: 'level_semester',
    joinColumn: { name: 'level_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'semester_id', referencedColumnName: 'id' },
  })
  semesters: Semester[];
}
