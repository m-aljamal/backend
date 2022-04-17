import { CreateStudent } from './dto/create-student';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity/student';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async createStudent(student: CreateStudent): Promise<Student> {
    let newStudent = await this.findStudent(
      student.firstName,
      student.lastName,
      student.fatherName,
    );
    if (newStudent) {
      throw new NotFoundException('الطالب موجود مسبقا');
    }

    return await this.studentRepo.save(student);
  }

  async findStudent(
    firstName: string,
    lastName: string,
    fatherName: string,
  ): Promise<Student> {
    return await this.studentRepo.findOne({
      firstName,
      lastName,
      fatherName,
    });
  }

  async findAllStudents(): Promise<Student[]> {
    return await this.studentRepo.find();
  }
}
