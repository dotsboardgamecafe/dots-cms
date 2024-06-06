
import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { CityType, GameCategoryType, GameMechanicType, ProvinceType } from '@/types/settings';

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

export const getGameCategories = async (options?: ApiOptions) => {
  return await fetcher<GameCategoryType[]>('getSettings', {
    ...options,
    query: {
      status: 'active',
      set_group: 'game_type',
    },
    requestOpt: {
      next: {
        tags: ['getGameCategories']
      }
    }
  });
};

export const getGameMechanics = async (options?: ApiOptions) => {
  return await fetcher<GameMechanicType[]>('getSettings', {
    ...options,
    query: {
      status: 'active',
      set_group: 'game_mechanic',
    },
    requestOpt: {
      next: {
        tags: ['getGameMechanics']
      }
    }
  });
};
