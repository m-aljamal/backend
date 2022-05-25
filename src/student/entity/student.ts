import { Project } from './../../project/entity/project';
import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
import { Level } from 'src/level/entity/level';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stuabsent } from 'src/stuabsent/enity/stuabsent';
import { StudyYear } from 'src/study-year/entity/study-year';
import { Semester } from 'src/semester/entity/semester';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  fatherName: string;

  @Field()
  @Column()
  phone: string;

  @ManyToOne(() => Level, (level) => level.students)
  @Field(() => Level)
  level: Level;

  @ManyToOne(() => Division, (division) => division.students)
  @Field(() => Division)
  division: Division;

  // @ManyToOne(() => Project, (project) => project.students)
  // @Field(() => Project)
  // project: Project;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // projectId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  levelId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  divisionId: string;

  @OneToMany(() => Stuabsent, (stuabsent) => stuabsent.student)
  @Field(() => [Stuabsent])
  absents: Stuabsent[];

  @ManyToMany(() => StudyYear, (studyYear) => studyYear.students)
  @Field(() => [StudyYear])
  @JoinTable({
    name: 'student_study_year',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'study_year_id', referencedColumnName: 'id' },
  })
  studyYears: StudyYear[];

  @ManyToMany(() => Semester, (semester) => semester.employees, {
    cascade: true,
  })
  @Field(() => [Semester], { nullable: true })
  @JoinTable({
    name: 'student_semester',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'semester_id', referencedColumnName: 'id' },
  })
  semesters: Semester[];
}
