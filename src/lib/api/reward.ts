'use server';
import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { RewardType } from '@/types/rewards';

export const getRewards = ( options?: ApiOptions ) => {
  return fetcher<RewardType[]>( 'getRewards', {
    ...options, requestOpt: {
      next: { tags: [ 'getRewards' ] }
    }
  } );
};

export const addRewards = async ( options?: ApiOptions ) => {
  const res = await fetcher( 'addReward', {
    ...options, requestOpt: {
      next: { tags: [ 'addRewards' ] }
    }
  } );
  revalidateTag( 'getRewards' );
  return res;
};

export const updateReward = async ( options?: ApiOptions ) => {
  const res = await fetcher( 'updateReward', {
    ...options,
    requestOpt: {
      next: { tags: [ 'updateReward' ] }
    }
  } );
  revalidateTag( 'getRewards' );
  return res;
};