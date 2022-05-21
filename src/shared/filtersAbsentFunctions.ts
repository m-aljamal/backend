import { SelectQueryBuilder } from 'typeorm';

export async function filterByDate(
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
