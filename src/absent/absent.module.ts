import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AbsentResolver } from './absent.resolver';
import { AbsentService } from './absent.service';
import { Absent } from './entity/absent';

@Module({
  imports: [TypeOrmModule.forFeature([Absent])],
  providers: [AbsentResolver, AbsentService],
})
export class AbsentModule {}
