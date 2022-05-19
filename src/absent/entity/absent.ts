import { Student } from './../../student/entity/student';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  // @Field(() => Student, { nullable: true })
  // @OneToOne(() => Student, (student) => student.absent)
  // @JoinColumn()
  // student: Student;

  @Field(() => Employee, { nullable: true })
  @OneToOne(() => Employee, (employee) => employee.absent)
  @JoinColumn()
  employee: Employee;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  employeeId: string;

  @Field(() => Boolean)
  @Column({ default: false })
  approved: boolean;

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
