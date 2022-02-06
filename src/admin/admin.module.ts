import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { Admin } from './entity/admin';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
