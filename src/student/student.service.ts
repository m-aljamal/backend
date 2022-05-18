import { CreateStudent } from './dto/create-student';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity/student';
import { studentArgs } from './dto/student.args';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async createStudent(student: CreateStudent): Promise<Student> {
    let newStudent = await this.findStudent(student.name, student.fatherName);
    if (newStudent) {
      throw new NotFoundException('الطالب موجود مسبقا');
    }

    return await this.studentRepo.save(student);
  }

  async findStudent(name: string, fatherName: string): Promise<Student> {
    return await this.studentRepo.findOne({
      name,
      fatherName,
    });
  }

  async findAllStudents(): Promise<Student[]> {
    return await this.studentRepo.find();
  }

  async findStudentById(id: string): Promise<Student> {
    return await this.studentRepo.findOne({
      where: { id },
      relations: ['division', 'level', 'project', 'absents'],
    });
  }

  async findStudentsByProject(args: studentArgs): Promise<Student[]> {
    const query = this.studentRepo.createQueryBuilder('student');
    query.leftJoinAndSelect('student.division', 'division');
    query.leftJoinAndSelect('student.level', 'level');

    if (args.levelName)
      query.andWhere('level.levelName = :levelName', {
        levelName: args.levelName,
      });

    if (args.divisionName)
      query.andWhere('division.divisionName = :divisionName', {
        divisionName: args.divisionName,
      });

    if (args.sortLevel) query.orderBy('level.levelNumber', args.sortLevel);

    if (args.sortDivision)
      query.orderBy('division.divisionNumber', args.sortDivision);

    query.andWhere('student.projectId = :projectId', {
      projectId: args.projectId,
    });

    return await query.getMany();
  }
}
