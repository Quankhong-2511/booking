import { InfinityPaginationResultType } from '../types/infinity-pagination-result';
import { IPaginationOptions } from '../types/pagination-option';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
