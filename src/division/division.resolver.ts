import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LevelService } from 'src/level/level.service';
import { DivisionService } from './division.service';
import { CreateDivision } from './dto/create-division';
import { Division } from './entity/division';

@Resolver(() => Division)
export class DivisionResolver {
  constructor(
    private readonly divisionService: DivisionService,
    private readonly levelService: LevelService,
  ) {}

  @Mutation(() => Division, { name: 'createDivision' })
  createDivision(@Args('division') division: CreateDivision) {
    return this.divisionService.createDivision(division);
  }

  @Query(() => [Division], { name: 'findAllDivision' })
  async findAllDivision() {
    return await this.divisionService.findAllDivision();
  }

  @ResolveField(() => Division)
  async level(@Parent() division: Division) {
    return await this.levelService.findOne(division.levelId);
  }
}
