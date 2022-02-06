import { AdminService } from './admin.service';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class AdminResolver {
    constructor(private readonly adminService: AdminService) {}

    


}
