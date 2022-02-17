import { InputType, PartialType } from '@nestjs/graphql';
import { CurrentMonthDiscountDto } from './current-month-discount.dto';

@InputType()
export class UpdateCurrentMonthDiscountDto extends PartialType(
  CurrentMonthDiscountDto,
) {}
