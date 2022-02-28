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
  SUPERVISOR = 'مشرف تربوي',
  HEAD_TEACHERS = 'المدير',
  TEACHER = 'مدرس',
  DATA_ENTRY = 'مدخل بيانات',
  SECRETARY = 'امين سر',
  COUNSELOR = 'مرشد',
  MEDIA = 'اعلامي',
  CLEANER = 'مستخدم',
  GUARD = 'حارس',
}

registerEnumType(JobTitle, {
  name: 'JobTitle',
});

export enum Job_Title {
  SUPERVISOR = 'مشرف تربوي',
  HEAD_TEACHERS = 'المدير',
  TEACHER = 'مدرس',
  DATA_ENTRY = 'مدخل بيانات',
  SECRETARY = 'امين سر',
  COUNSELOR = 'مرشد',
  MEDIA = 'اعلامي',
  CLEANER = 'مستخدم',
  GUARD = 'حارس',
}

registerEnumType(Job_Title, {
  name: 'Job_Title',
});

export enum Levels {
  GRADE_1 = 'الصف الاول',
  GRADE_2 = 'الصف الثاني',
  GRADE_3 = 'الصف الثالث',
  GRADE_4 = 'الصف الرابع',
  GRADE_5 = 'الصف الخامس',
  GRADE_6 = 'الصف السادس',
  GRADE_7 = 'الصف السابع',
  GRADE_8 = 'الصف الثامن',
  GRADE_9 = 'الصف التاسع',
  GRADE_10 = 'الصف العاشر',
  GRADE_11 = 'الصف الحادي عشر',
  GRADE_12 = 'الصف الثاني عشر',
}

registerEnumType(Levels, {
  name: 'Levels',
});

export enum Divisions {
  DIVISION_1 = 'الشعبة الاولى',
  DIVISION_2 = 'الشعبة الثانية',
  DIVISION_3 = 'الشعبة الثالثة',
  DIVISION_4 = 'الشعبة الرابعة',
}

registerEnumType(Divisions, {
  name: 'Divisions',
});
