import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { DailyDiscountModule } from './daily-discount/daily-discount.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      // port: 5434,
      username: 'postgres',
      password: 'metal158',
      database: 'postgres',
      // database: 'school-employees-manger',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    ProjectModule,
    EmployeeModule,
    DailyDiscountModule,
  ],
})
export class AppModule {}
