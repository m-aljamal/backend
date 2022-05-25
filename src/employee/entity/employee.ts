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
import { Empabsent } from 'src/empabsent/enity/empabsent';
import { StudyYear } from 'src/study-year/entity/study-year';
import { Semester } from 'src/semester/entity/semester';

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

  // @ManyToOne(() => Project, (project) => project.employees)
  // @Field(() => Project)
  // project: Project;

  @OneToMany(
    () => CurrentMonthDiscount,
    (dailyDiscount) => dailyDiscount.employee,
  )
  @Field(() => [CurrentMonthDiscount])
  currentMonthDiscounts: CurrentMonthDiscount[];

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // projectId: string;

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

  @OneToMany(() => Empabsent, (empabsent) => empabsent.employee)
  @Field(() => [Empabsent])
  absents: Empabsent[];

  @ManyToMany(() => StudyYear, (studyYear) => studyYear.employees, {
    cascade: true,
  })
  @Field(() => [StudyYear], { nullable: true })
  @JoinTable({
    name: 'employee_study_year',
    joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'study_year_id', referencedColumnName: 'id' },
  })
  studyYears: StudyYear[];

  @ManyToMany(() => Semester, (semester) => semester.employees, {
    cascade: true,
  })
  @Field(() => [Semester], { nullable: true })
  @JoinTable({
    name: 'employee_semester',
    joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'semester_id', referencedColumnName: 'id' },
  })
  semesters: Semester[];
}
