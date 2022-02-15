import { Field } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
