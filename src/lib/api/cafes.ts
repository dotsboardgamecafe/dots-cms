import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { CafeType } from '@/types/cafes';

export const getCafes = async ( options?: ApiOptions ) => {
  return await fetcher<CafeType[]>( 'getCafes', { query: { status: 'active' }, ...options } );
};
