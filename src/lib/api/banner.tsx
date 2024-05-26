import fetcher, { ApiOptions } from "@/lib/api/utils/fetcher";

import { TBannerData, TPostBannerPayload } from "@/types/banner";


export const getBanners = async (options?: ApiOptions) => {
  return await fetcher<TBannerData[]>('getBanners', options);
};

export const addBanners = async (options: ApiOptions<TPostBannerPayload>) => {
  return await fetcher('addBanner', options)
}

export const updateBanners = async (options: ApiOptions<TPostBannerPayload>) => {
  return await fetcher('updateBanner', options)
}