import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Employee, (employee) => employee.absents)
  @Field(() => Employee)
  employee: Employee;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  employeeId: string;
}
