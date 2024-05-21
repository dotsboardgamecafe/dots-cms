import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { TierType } from '@/types/tier';

export const getTiers = async ( options?: ApiOptions ) => {
  return await fetcher<TierType[]>( 'getTiers', options );
};