import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entity/project';
import { Semester } from 'src/semester/entity/semester';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Archive {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.archives)
  @Field(() => Project)
  project: Project;

  @Column()
  @Field()
  projectId: string;

  @OneToMany(() => Semester, (semester) => semester.archive)
  @Field(() => [Semester])
  semesters: Semester[];
}
