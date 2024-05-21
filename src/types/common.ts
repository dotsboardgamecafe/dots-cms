import { Pagination } from '@/types/network';

export type PageProps<Param = null> = {
  searchParams: {
    pagination: Pagination;
  },
  params: Param;
};