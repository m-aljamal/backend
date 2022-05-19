import { Student } from './../../student/entity/student';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/project/entity/project';

@ObjectType()
@Entity()
export class Absent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note: string;

  // @ManyToOne(() => Employee, (employee) => employee.absents, { nullable: true })
  // @Field(() => Employee, { nullable: true })
  // employee: Employee;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  employeeId: string;

  @Field(() => Boolean)
  @Column({ default: false })
  approved: boolean;

  // @ManyToOne(() => Student, (student) => student.absents, { nullable: true })
  // @Field(() => Student, { nullable: true })
  // student: Student;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  studentId: string;

  @ManyToOne(() => Project, (project) => project.absents, { nullable: true })
  @Field(() => Project, { nullable: true })
  project: Project;

  @Field(() => String)
  @Column()
  projectId: string;
}
