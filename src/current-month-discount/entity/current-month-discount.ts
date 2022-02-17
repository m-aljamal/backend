import { Project } from './../../project/entity/project';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class CurrentMonthDiscount {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  late: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  absence: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  punishment: number;

  @ManyToOne(() => Employee, (employee) => employee.currentMonthDiscounts)
  @Field(() => Employee)
  employee: Employee;

  @Column()
  @Field()
  employeeId: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @Field()
  @Column({ default: false })
  approved: boolean;
}
