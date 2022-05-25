import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import { Student } from 'src/student/entity/student';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class StudyYear {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column({ type: 'timestamp' })
  firstSemesterStart: Date;

  @Field()
  @Column({ type: 'timestamp' })
  firstSemesterEnd: Date;

  @Field()
  @Column({ type: 'timestamp' })
  secondSemesterStart: Date;

  @Field()
  @Column({ type: 'timestamp' })
  secondSemesterEnd: Date;

  @Field()
  @Column({ type: 'timestamp' })
  summerActivityStart: Date;

  @Field()
  @Column({ type: 'timestamp' })
  summerActivityEnd: Date;

  @ManyToMany(() => Employee, (employee) => employee.studyYears)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @ManyToMany(() => Student, (student) => student.studyYears)
  @Field(() => [Student], { nullable: true })
  students: Student[];
}
