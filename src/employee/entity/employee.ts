import { Absent } from './../../absent/entity/absent';
import { JobTitle } from './../../utils/types';
import { CurrentMonthDiscount } from './../../current-month-discount/entity/current-month-discount';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Project } from 'src/project/entity/project';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/utils/types';
import { Level } from 'src/level/entity/level';
import { Division } from 'src/division/entity/division';

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

  @ManyToMany(() => Level, (level) => level.employees, { cascade: true })
  @Field(() => [Level], { nullable: true })
  @JoinTable({
    name: 'employee_level',
    joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'level_id', referencedColumnName: 'id' },
  })
  levels: Level[];

  @ManyToMany(() => Division, (division) => division.employees, {
    cascade: true,
  })
  @Field(() => [Division], { nullable: true })
  @JoinTable({
    name: 'employee_division',
    joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'division_id', referencedColumnName: 'id' },
  })
  divisions: Division[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar: string;

  // @OneToOne((type) => Absent, (absent) => absent.employee)
  // @Field(() => Absent, { nullable: true })
  // absent: Absent;
}
