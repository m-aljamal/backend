import { EmployeeDto } from './employee.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(EmployeeDto) {}
