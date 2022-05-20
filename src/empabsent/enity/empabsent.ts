import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entity/project';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Empabsent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note: string;

  @Field(() => Boolean)
  @Column({ default: false })
  approved: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  absenceReason: string;

  @Field(() => String)
  @Column()
  projectId: string;
}
