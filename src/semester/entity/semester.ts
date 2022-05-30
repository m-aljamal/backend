import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Employee } from 'src/employee/entity/employee';
import { Level } from 'src/level/entity/level';
import { Student } from 'src/student/entity/student';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@ObjectType()
@Entity()
export class Semester {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  // @Field()
  // startDate: Date;

  // @Field()
  // endDate: Date;

  @ManyToOne(() => Archive, (archive) => archive.semesters)
  @Field(() => Archive)
  archive: Archive;

  @Field()
  @Column()
  archiveId: string;

  @ManyToMany(() => Employee, (employee) => employee.semesters)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @ManyToMany(() => Student, (student) => student.semesters)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToMany(() => Level, (level) => level.semesters)
  @Field(() => [Level], { nullable: true })
  levels: Level[];
}
