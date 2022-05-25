import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Empabsent } from 'src/empabsent/enity/empabsent';
import { Employee } from 'src/employee/entity/employee';
import { Student } from 'src/student/entity/student';
import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@ObjectType()
@Entity()
export class Semester {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @ManyToOne(() => Archive, (archive) => archive.semesters)
  @Field(() => Archive)
  archive: Archive;

  @Field()
  archiveId: string;

  @ManyToMany(() => Employee, (employee) => employee.semesters)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @ManyToMany(() => Student, (student) => student.semesters)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToMany(() => Empabsent, (empabsent) => empabsent.semesters)
  @Field(() => [Empabsent], { nullable: true })
  employeeAbsents: Empabsent[];
}
