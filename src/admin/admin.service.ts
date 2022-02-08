import { hashPassword } from './../utils/hashPassword';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './entity/admin';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(admin: AdminDto) {
    let newAdmin = await this.adminRepository.findOne({
      where: {
        username: admin.username,
      },
    });

    if (newAdmin) {
      throw new BadRequestException('اسم المستخدم موجود مسبقا');
    }

    newAdmin = this.adminRepository.create({
      ...admin,
      password: hashPassword(admin.password),
    });
    return this.adminRepository.save(newAdmin);
  }

  async getAdmins() {
    return await this.adminRepository.find();
  }
}
