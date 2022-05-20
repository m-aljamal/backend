import { Absent } from 'src/absent/entity/absent';
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

  @OneToMany(() => Employee, (employee) => employee.project)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @OneToMany(() => Level, (level) => level.project)
  @Field(() => [Level], { nullable: true })
  levels: Level[];

  @OneToMany(() => Student, (student) => student.project)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @OneToMany(() => Absent, (absent) => absent.project)
  @Field(() => [Absent], { nullable: true })
  absents: Absent[];
}
