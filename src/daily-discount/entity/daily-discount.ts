import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class DailyDiscount {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes: string;

  @Field()
  @Column({ type: 'numeric' })
  discount: number;

  @ManyToOne(() => Employee, (employee) => employee.dailyDiscounts, {})
  @Field(() => Employee)
  employee: Employee;

  @Column()
  @Field()
  employeeId: string;
}
