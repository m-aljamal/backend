import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/entity/student';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Student, (student) => student.absents)
  @Field(() => Student)
  student: Student;
}
