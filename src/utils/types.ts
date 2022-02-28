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
  MANGER = 'MANGER',
  TEACHER = 'teacher',
}

registerEnumType(Role, {
  name: 'Role',
});

export enum JobTitle {
  SUPERVISOR = 'المشرف التربوي',
  HEAD_TEACHERS = 'مدير المدرسة',
  TEACHER = 'مدرس',
  DATA_ENTRY = 'مدخل البيانات',
  SECRETARY = 'امين سر',
  COUNSELOR = 'مرشد',
  MEDIA = 'إعالمي ',
  CLEANER = 'مستخدم',
  GUARD = 'حارس',
}

registerEnumType(JobTitle, {
  name: 'JopTitle',
});
