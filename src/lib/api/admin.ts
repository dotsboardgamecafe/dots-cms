import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AdminType } from '@/types/admin';

export const getAdmins = async ( options?: ApiOptions ) => {
  return await fetcher<AdminType[]>( 'getAdmins', options );
};