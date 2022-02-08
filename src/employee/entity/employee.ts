import { DailyDiscount } from './../../daily-discount/entity/daily-discount';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
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

export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

registerEnumType(Role, {
  name: 'Role',
});
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
  @Column({ type: 'int', nullable: true })
  salary: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
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

  @Column({ nullable: true })
  @Field()
  projectId: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({
    enum: Role,
    default: Role.EMPLOYEE,
    type: 'enum',
  })
  @Field(() => Role)
  role: Role;
}
