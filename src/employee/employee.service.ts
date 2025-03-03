import { DivisionService } from './../division/division.service';
import { ProjectEmployeesArgs } from './dto/employee.args';
import { EmployeeArgs } from './dto/findEmployee.args';
import { hashPassword } from './../utils/hashPassword';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Role, JobTitle } from 'src/utils/types';
import { EmployeesByRole } from './entity/EmployeeByType';
import { LevelService } from 'src/level/level.service';
import { StudyYearService } from 'src/study-year/study-year.service';
import { UpdateEmployeeInput } from './dto/update.employee';
import { SemesterService } from 'src/semester/semester.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmpRepo: Repository<Employee>,
    private readonly levelService: LevelService,
    private readonly divisionService: DivisionService,
    private readonly studyYearService: StudyYearService,
    private readonly semesterSerivce: SemesterService,
  ) {}

  async findAllEmployees(args: EmployeeArgs): Promise<Employee[]> {
    const query = this.EmpRepo.createQueryBuilder('employee');
    if (args.role) query.andWhere('employee.role = :role', { role: args.role });

    if (args.projectId)
      query.andWhere('employee.projectId = :projectId', {
        projectId: args.projectId,
      });

    query.leftJoinAndSelect('employee.levels', 'levels');
    query.leftJoinAndSelect('employee.divisions', 'divisions');
    query.leftJoinAndSelect('employee.semesters', 'semesters');

    return await query.getMany();
  }

  async createEmployee(employee: EmployeeDto) {
    let newEmployee = await this.EmpRepo.createQueryBuilder('employee')
      .where('employee.username = :username', { username: employee.username })
      .orWhere('employee.name = :name', { name: employee.name })
      .getOne();

    if (newEmployee) {
      throw new BadRequestException(' اسم الموظف او اسم المستخدم موجود مسبقا');
    }
    let levels = [];
    let divisions = [];

    if (employee.jobTitle === JobTitle.TEACHER) {
      levels = await Promise.all(
        employee.levels.map(async (id) => {
          const level = await this.loadLevels(id);
          if (!level) {
            throw new BadRequestException('المرحلة غير موجودة');
          }
          return level;
        }),
      );
      divisions = await Promise.all(
        employee.divisions.map(async (id) => {
          const division = await this.loadDivisions(id);
          if (!division) {
            throw new BadRequestException('الشعبة غير موجودة');
          }
          return division;
        }),
      );
    }

    const semesters = await Promise.all(
      employee.semesters.map(async (id) => {
        const semester = await this.loadSemesters(id);
        if (!semester) {
          throw new BadRequestException('الفصل غير موجود');
        }
        return semester;
      }),
    );

    newEmployee = this.EmpRepo.create({
      ...employee,

      password: hashPassword(employee.password),
      levels,
      divisions,
      semesters,
    });
    console.log(newEmployee);

    return await this.EmpRepo.save(newEmployee);
  }

  async findSalaries(projectId: string) {
    return await this.EmpRepo.createQueryBuilder('employee')
      .select('employee.id', 'id')
      .addSelect('employee.name', 'name')
      .addSelect('employee.salary', 'salary')

      .addSelect(
        ' COALESCE(SUM(current_month_discount.late ),0)::INTEGER',
        'late',
      )
      .addSelect(
        'COALESCE(SUM(current_month_discount.absence ),0)::INTEGER',
        'absence',
      )
      .addSelect(
        'COALESCE(SUM(current_month_discount.punishment),0)::INTEGER',
        'punishment',
      )
      .addSelect(
        'salary - COALESCE(SUM(current_month_discount.punishment ),0)::INTEGER - COALESCE(SUM(current_month_discount.absence ),0)::INTEGER - COALESCE(SUM(current_month_discount.late ),0)::INTEGER ',
        'totalSalart',
      )
      .where('employee.projectId = :projectId', { projectId })
      .leftJoin(
        'current_month_discount',
        'current_month_discount',
        'employee.id = current_month_discount.employeeId',
      )
      .addGroupBy('employee.id')
      .addGroupBy('current_month_discount.employeeId')
      .getRawMany();
  }

  async getEmployeesByProject(
    projectEmployees: ProjectEmployeesArgs,
  ): Promise<Employee[]> {
    return await this.EmpRepo.find({
      where: {
        role: Not(Role.ADMIN),
      },
      relations: ['currentMonthDiscounts', 'absents'],
      order: { createdAt: projectEmployees.sortBy },
    });
  }

  async findByUsername(username: string): Promise<Employee> {
    return await this.EmpRepo.findOne({ username });
  }

  async findEmployeesByRole(projectId: string): Promise<EmployeesByRole> {
    const [mangers, teachers, services] = await Promise.all([
      this.EmpRepo.find({
        where: {
          projectId,
          role: Role.MANGER,
        },
        order: { jobTitle: 'ASC' },
      }),
      this.EmpRepo.find({
        where: {
          projectId,
          role: Role.TEACHER,
        },
        relations: ['levels', 'divisions'],
      }),
      this.EmpRepo.find({
        where: {
          projectId,
          role: Role.SERVICE,
        },
      }),
    ]);

    return {
      mangers,
      teachers,
      services,
    };
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.EmpRepo.findOne({
      where: { id },
      relations: ['project', 'levels', 'divisions'],
    });

    if (!employee) {
      throw new NotFoundException('الموظف غير موجود');
    }
    return employee;
  }

  async findEmployee(id: string) {
    return await this.EmpRepo.findOne({
      where: { id },
      relations: ['project', 'levels', 'divisions', 'studyYears'],
    });
  }

  async updateEmployee(id: string, updateEmployeeInput: UpdateEmployeeInput) {
    // let employee = await this.EmpRepo.findOne({
    //   where: { id },
    //   relations: ['project', 'levels', 'divisions', 'studyYears'],
    // });
    // if (!employee) {
    //   throw new NotFoundException('الموظف غير موجود');
    // }
    // let newStudyYears = [];
    // if (updateEmployeeInput.studyYears) {
    //   newStudyYears = await Promise.all(
    //     updateEmployeeInput.studyYears.map(async (id) => {
    //       const studyYear = await this.loadStudyYears(id);
    //       if (!studyYear) {
    //         throw new BadRequestException('السنة الدراسية غير موجودة');
    //       }
    //       return studyYear;
    //     }),
    //   );
    // }
    // const studyYears = [...employee.studyYears, ...newStudyYears];
    // updateEmployeeInput.password
    //   ? (updateEmployeeInput.password = hashPassword(
    //       updateEmployeeInput.password,
    //     ))
    //   : null;
    // updateEmployeeInput.studyYears = studyYears;
    // Object.assign(employee, updateEmployeeInput);
    // return await this.EmpRepo.save(employee);
  }

  private async loadLevels(id: string) {
    return await this.levelService.findOne(id);
  }

  private async loadDivisions(id: string) {
    return await this.divisionService.findDivisionBySchoolId(id);
  }

  private async loadStudyYears(id: string) {
    return await this.studyYearService.findOne(id);
  }
  private async loadSemesters(id: string) {
    return this.semesterSerivce.findOne(id);
  }
}
