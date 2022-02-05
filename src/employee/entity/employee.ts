import { DailyDiscount } from './../../daily-discount/entity/daily-discount';
import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entity/project';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('Employee')
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'int' })
  salary: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field({})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.employees)
  @Field(() => Project)
  project: Project;

  @OneToMany(() => DailyDiscount, (dailyDiscount) => dailyDiscount.employee, {})
  @Field(() => [DailyDiscount])
  dailyDiscounts: DailyDiscount[];

  @Column()
  @Field()
  projectId: string;
}
