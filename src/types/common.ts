import { Pagination } from '@/types/network';

export type PageProps<Param = null> = {
  searchParams: Pagination
  params: Param;
};