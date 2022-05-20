import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entity/project';
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => Student, (student) => student.absents)
  @Field(() => Student)
  student: Student;

  @Field(() => Boolean)
  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => Project, (project) => project.absents)
  @Field(() => Project)
  project: Project;

  @Field(() => String)
  @Column()
  projectId: string;
}
