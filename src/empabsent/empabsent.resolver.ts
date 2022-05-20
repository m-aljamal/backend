import { CreateEmpabsent } from './dto/empabsent';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { EmpabsentService } from './empabsent.service';
import { Empabsent } from './enity/empabsent';

@Resolver(() => Empabsent)
export class EmpabsentResolver {
  constructor(private readonly empabsentService: EmpabsentService) {}

  @Mutation(() => Empabsent)
  async createEmpabsent(@Args('empabsent') empabsent: CreateEmpabsent) {
    return await this.empabsentService.createEmpabsent(empabsent);
  }

  @Query(() => [Empabsent])
  async getAllEmpabsent() {
    return await this.empabsentService.getAllEmpabsent();
  }
}
