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
