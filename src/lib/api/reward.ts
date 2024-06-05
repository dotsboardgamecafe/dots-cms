import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { RewardType } from '@/types/rewards';

export const getRewards = ( options?: ApiOptions ) => {
  return fetcher<RewardType[]>( 'getRewards', options );
};