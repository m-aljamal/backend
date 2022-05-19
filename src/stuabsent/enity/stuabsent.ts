import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/entity/student';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Stuabsent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  studentId: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field(() => Student)
  @OneToOne(() => Student, (student) => student.absent)
  @JoinColumn()
  student: Student;
}
