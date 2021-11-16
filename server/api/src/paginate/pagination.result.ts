export interface PaginationResult<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  next?: string;
  previous?: string;
}
