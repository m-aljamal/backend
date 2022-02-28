import { JobTitle } from './../../utils/types';
import { CurrentMonthDiscount } from './../../current-month-discount/entity/current-month-discount';
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
import { Role } from 'src/utils/types';

@ObjectType('Employee')
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
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

  @OneToMany(
    () => CurrentMonthDiscount,
    (dailyDiscount) => dailyDiscount.employee,
  )
  @Field(() => [CurrentMonthDiscount])
  currentMonthDiscounts: CurrentMonthDiscount[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  projectId: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({
    enum: Role,
    default: Role.MANGER,
    type: 'enum',
  })
  @Field(() => Role)
  role: Role;

  @Column({ nullable: true })
  @Field(() => JobTitle, { nullable: true })
  jobTitle: JobTitle;

  @Column('json', { nullable: true })
  @Field(() => [Division], { nullable: true })
  divisions: Division[];

  @Column('json', { nullable: true })
  @Field(() => [Level], { nullable: true })
  levels: Level[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar: string;
}

@ObjectType()
class Level {
  @Field((type) => Number, { nullable: true })
  @Column({ nullable: true })
  levelNumber: Number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  levelString: String;
}

@ObjectType()
class Division {
  @Field((type) => Number, { nullable: true })
  @Column({ nullable: true })
  divisionNumber: Number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  divisionString: String;
}
