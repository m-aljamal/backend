import { Employee } from 'src/employee/entity/employee';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './../employee/employee.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<Employee | null> {
    const user = await this.employeeService.findByUsername(username);

    if (!user) {
      return null;
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }
  // async validate(body: any) {
  //   const { username, password, kind } = body;
  //   let user;
  //   if (kind === 'employee') {
  //     user = await this.employeeService.findByUsername(username);
  //   } else if (kind === 'admin') {
  //     user = await this.adminService.findByUsername(username);
  //   }

  //   if (!user) {
  //     return null;
  //   }
  //   const isPasswordMatch = bcrypt.compareSync(password, user.password);
  //   if (!isPasswordMatch) {
  //     return null;
  //   }

  //   return user;
  // }

  async login(user: Employee): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async verify(token: string) {
    const decoded = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.employeeService.findByUsername(decoded.username);
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    return user;
  }
}
