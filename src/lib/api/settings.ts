
import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { CityType, ProvinceType } from '@/types/settings';

export const getCity = async (options?: ApiOptions) => {
  return await fetcher<CityType[]>('getSettings', {
    ...options,
    query: {
      status: 'active',
      sort: 'asc',
      limit: '999',
      set_group: 'city',
    },
    requestOpt: {
      next: {
        tags: ['getCity']
      }
    }
  });
};

export const getProvince = async (options?: ApiOptions) => {
  return await fetcher<ProvinceType[]>('getSettings', {
    ...options,
    query: {
      status: 'active',
      sort: 'asc',
      limit: '999',
      set_group: 'province',
    },
    requestOpt: {
      next: {
        tags: ['getProvince']
      }
    }
  });
};
