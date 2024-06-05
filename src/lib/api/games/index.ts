
import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddGamePayload, GameType } from '@/types/game';


export const getGameList = async (options?: ApiOptions) => {
  return await fetcher<GameType[]>('getGames', options);
};

export const addGame = async (options: ApiOptions) => {
  return await fetcher<AddGamePayload>('addGame', options);
};
