import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './../employee/employee.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import ApiFeatch from 'src/utils/apiFeatcher';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.employeeService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('المستخدم غير موجود');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('كلمة المرور غير صحيحة');
    }
    const token = await ApiFeatch.assignJwtToken(user.id, this.jwtService);

    return { token };
  }

  async findUserById(id: string) {
    return {};
  }
}
