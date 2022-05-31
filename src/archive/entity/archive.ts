import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entity/project';
import { Semester } from 'src/semester/entity/semester';
import {
  Column,
  CreateDateColumn,
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

  @OneToMany(() => Semester, (semester) => semester.archive, { nullable: true })
  @Field(() => [Semester], { nullable: true })
  semesters: Semester[];

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}
