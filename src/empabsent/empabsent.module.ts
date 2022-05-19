import { Module } from '@nestjs/common';
import { EmpabsentService } from './empabsent.service';
import { EmpabsentResolver } from './empabsent.resolver';

@Module({
  providers: [EmpabsentService, EmpabsentResolver]
})
export class EmpabsentModule {}
