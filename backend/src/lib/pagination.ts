export const PAGINATION_DEFAULT_PAGE = 1;
export const PAGINATION_DEFAULT_LIMIT = 20;
export const PAGINATION_MAX_LIMIT = 100;

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const DEFAULT_PAGE = PAGINATION_DEFAULT_PAGE;
const DEFAULT_LIMIT = PAGINATION_DEFAULT_LIMIT;
const MAX_LIMIT = PAGINATION_MAX_LIMIT;

export function parsePagination(input: {
  page?: number | string | undefined;
  limit?: number | string | undefined;
}): PaginationParams {
  const page = Math.max(DEFAULT_PAGE, Number(input.page) || DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(input.limit) || DEFAULT_LIMIT));

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export function buildPaginationMeta(
  pagination: Pick<PaginationParams, "page" | "limit">,
  total: number,
): PaginationMeta {
  return {
    page: pagination.page,
    limit: pagination.limit,
    total,
    totalPages: total === 0 ? 0 : Math.ceil(total / pagination.limit),
  };
}
