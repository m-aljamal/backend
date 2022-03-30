import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DivisionService } from './division.service';
import { CreateDivision } from './dto/create-division';
import { Division } from './entity/division';

@Resolver(() => Division)
export class DivisionResolver {
  constructor(private readonly divisionService: DivisionService) {}

  @Mutation(() => Division, { name: 'createDivision' })
  createDivision(@Args('division') division: CreateDivision) {
    return this.divisionService.createDivision(division);
  }
}
