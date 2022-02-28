import { registerEnumType } from '@nestjs/graphql';

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(Sort, {
  name: 'Sort',
});

export enum Role {
  ADMIN = 'admin',
  MANGER = 'manger',
  TEACHER = 'teacher',
  SERVICE = 'service',
}

registerEnumType(Role, {
  name: 'Role',
});

export enum JobTitle {
  SUPERVISOR = 'supervisor',
  HEAD_TEACHERS = 'headTeachers',
  TEACHER = 'teacher',
  DATA_ENTRY = 'dataEntry',
  SECRETARY = 'secretary',
  COUNSELOR = 'counselor',
  MEDIA = 'media',
  CLEANER = 'cleaner',
  GUARD = 'guard',
}

registerEnumType(JobTitle, {
  name: 'JobTitle',
});
