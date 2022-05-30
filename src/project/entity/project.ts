import { Archive } from './../../archive/entity/archive';
import { Student } from 'src/student/entity/student';
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
import { Level } from 'src/level/entity/level';
import { StudyYear } from 'src/study-year/entity/study-year';

@ObjectType()
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nameAr: string;

  @Field()
  @Column()
  nameEn: string;

  @Field()
  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field({})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => StudyYear, (studyYear) => studyYear.project)
  @Field(() => [StudyYear], { nullable: true })
  studyYears: StudyYear[];

  @OneToMany(() => Archive, (archive) => archive.project)
  @Field(() => [Archive], { nullable: true })
  archives: Archive[];
}
