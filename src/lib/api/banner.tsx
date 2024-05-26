
'use server';
import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from "@/lib/api/utils/fetcher";

import { TBannerData, TPostBannerPayload } from "@/types/banner";


export const getBanners = async (options?: ApiOptions) => {
  return await fetcher<TBannerData[]>('getBanners', {
    ...options, requestOpt: {
      next: {
        tags: ['getBanners']
      }
    }
  });
};

export const addBanners = async (options: ApiOptions<TPostBannerPayload>) => {
  const res = await fetcher('addBanner', options);
  revalidateTag('getBanners');
  return res;
};

export const updateBanners = async (options: ApiOptions<TPostBannerPayload>) => {
  const res = await fetcher('updateBanner', options);
  revalidateTag('getBanners');
  return res
};