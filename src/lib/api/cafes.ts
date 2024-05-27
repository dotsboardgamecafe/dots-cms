'use server'

import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { CafePayload, CafeType } from '@/types/cafes';

export const getCafes = async (options?: ApiOptions) => {
  return await fetcher<CafeType[]>('getCafes', { ...options, requestOpt: { next: { tags: ['getCafes'] } } });
};

export const addCafe = async (options: ApiOptions<CafePayload>) => {
  const res = await fetcher('addCafe', options);
  revalidateTag('getCafes');
  return res;
};

export const updateCafe = async (options: ApiOptions<CafePayload>) => {
  const res = await fetcher('updateCafe', options);
  revalidateTag('getCafes');
  return res
};