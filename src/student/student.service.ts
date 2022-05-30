import { CreateStudent } from './dto/create-student';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity/student';
import { studentArgs } from './dto/student.args';
import { StudyYearService } from 'src/study-year/study-year.service';
import { SemesterService } from 'src/semester/semester.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly studyYearService: StudyYearService,
    private readonly semesterService: SemesterService,
  ) {}

  async createStudent(student: CreateStudent): Promise<Student> {
    let newStudent = await this.findStudent(student.name, student.fatherName);
    if (newStudent) {
      throw new NotFoundException('الطالب موجود مسبقا');
    }
    // const studyYears = await Promise.all(
    //   student.studyYears.map(async (id) => {
    //     const studyYear = await this.loadStudyYears(id);
    //     if (!studyYear) {
    //       throw new NotFoundException('العام الدراسي غير موجود');
    //     }
    //     return studyYear;
    //   }),
    // );
    const semesters = await Promise.all(
      student.semesters.map(async (id) => {
        const semester = await this.loadSemesters(id);
        if (!semester) {
          throw new NotFoundException('الفصل الدراسي غير موجود');
        }
        return semester;
      }),
    );
    let createNewStudent = this.studentRepo.create({
      ...student,
      semesters,
    });
    return await this.studentRepo.save(createNewStudent);
  }

  async findStudent(name: string, fatherName: string): Promise<Student> {
    return await this.studentRepo.findOne({
      name,
      fatherName,
    });
  }

  async findAllStudents(): Promise<Student[]> {
    return await this.studentRepo.find({
      relations: ['division', 'level', 'project', 'absents', 'studyYears'],
    });
  }

  async findStudentById(id: string): Promise<Student> {
    return await this.studentRepo.findOne({
      where: { id },
      relations: ['division', 'level', 'project'],
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
  // private async loadStudyYears(id: string) {
  //   return await this.studyYearService.findOne(id);
  // }

  private async loadSemesters(id: string) {
    return await this.semesterService.findOne(id);
  }
}
