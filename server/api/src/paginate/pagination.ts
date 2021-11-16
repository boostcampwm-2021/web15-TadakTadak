import { PaginationResult } from './pagination.result';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public pageTotal: number;
  public total: number;

  constructor(paginationResult: PaginationResult<PaginationEntity>) {
    this.results = paginationResult.results;
    this.pageTotal = paginationResult.results.length;
    this.total = paginationResult.total;
  }
}
