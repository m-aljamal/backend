import { CurrentMonthDiscount } from './../../current-month-discount/entity/current-month-discount';
import { Employee } from './../../employee/entity/employee';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field({})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Employee, (employee) => employee.project)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @OneToMany(
    () => CurrentMonthDiscount,
    (currentMonthDiscount) => currentMonthDiscount.project,
  )
  @Field(() => [CurrentMonthDiscount], { nullable: true })
  currentMonthDiscounts: CurrentMonthDiscount[];
}
