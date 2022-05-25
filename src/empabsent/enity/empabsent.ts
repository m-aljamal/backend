import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import { Semester } from 'src/semester/entity/semester';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Empabsent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note: string;

  @Field(() => Boolean)
  @Column({ default: false })
  approved: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  absenceReason: string;

  @Field(() => String)
  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.absents)
  @Field(() => Employee)
  employee: Employee;

  @ManyToMany(() => Semester, (semester) => semester.employeeAbsents, {
    cascade: true,
  })
  @Field(() => [Semester], { nullable: true })
  @JoinTable({
    name: 'empabsent_semester',
    joinColumn: { name: 'empabsent_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'semester_id', referencedColumnName: 'id' },
  })
  semesters: Semester[];
}
