import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { GameType } from '@/types/game';


export const getGameList = async ( options?: ApiOptions ) => {
  return await fetcher<GameType[]>( 'getGames', options );
};

export const addGame = async ( options: ApiOptions ) => {
  return await fetcher<GameType>( 'addGame', options );
};