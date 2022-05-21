import { isBoolean } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';

export function filterByDate(
  fromDate: Date,
  toDate: Date,
  sqlTable: string,
  query: SelectQueryBuilder<any>,
) {
  if (fromDate && toDate) {
    return query.andWhere(`${sqlTable}.date BETWEEN :fromDate AND :toDate`, {
      fromDate,
      toDate,
    });
  }
}
export function filterByName(
  name: string,
  sqlTable: string,
  query: SelectQueryBuilder<any>,
  type: string,
) {
  if (name) {
    query.leftJoinAndSelect(`${sqlTable}.${type}`, type);
    return query.andWhere(`${sqlTable}.name = :name`, { name });
  }
}

export function filterByApproved(
  approved: boolean,
  sqlTable: string,
  query: SelectQueryBuilder<any>,
) {
  if (isBoolean(approved)) {
    return query.andWhere(`${sqlTable}.approved = :approved`, { approved });
  }
}

export function filterByExactDate(
  date: Date,
  sqlTable: string,
  query: SelectQueryBuilder<any>,
) {
  if (date) {
    return query.andWhere(`${sqlTable}.date = :date`, { date });
  }
}
