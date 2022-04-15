import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee';
import { Level } from 'src/level/entity/level';
import { Student } from 'src/student/entity/student';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Division {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Number)
  @Column()
  divisionNumber: Number;

  @Field()
  @Column()
  divisionName: string;

  @ManyToOne(() => Level, (level) => level.divisions)
  @Field(() => Level)
  level: Level;

  @OneToMany(() => Student, (student) => student.division)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  levelId: string;

  @ManyToMany(() => Employee, (employee) => employee.levels)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];
}
