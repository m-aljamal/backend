import { AdminDto } from './dto/admin.dto';
import { AdminService } from './admin.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Admin } from './entity/admin';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  async createAdmin(@Args('admin') admin: AdminDto) {
    return await this.adminService.createAdmin(admin);
  }

  @Query(() => [Admin])
  async getAdmins() {
    return await this.adminService.getAdmins();
  }

  
}
