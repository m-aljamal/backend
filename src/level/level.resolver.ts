import { ProjectService } from './../project/project.service';
import { CreateLevel } from './dto/create-level';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Level } from './entity/level';
import { LevelService } from './level.service';
import { LevelArgs } from './dto/level.args';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Mutation(() => Level, { name: 'createLevel' })
  createLevel(@Args('level') level: CreateLevel) {
    return this.levelService.createLevel(level);
  }

  @Query(() => [Level], { name: 'findAllLevels' })
  findAllLevels(@Args() levelArgs: LevelArgs) {
    return this.levelService.findAllLevels(levelArgs);
  }

  @Query(() => [Level], { name: 'findStudentsByLevel' })
  async findStudentsByLevel(@Args() levelArgs: LevelArgs): Promise<Level[]> {
    return this.levelService.findStudentsByLevel(levelArgs);
  }
}
