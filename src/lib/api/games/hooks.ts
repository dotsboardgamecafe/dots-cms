"use client"

import { useEffect } from 'react';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { useAsyncLoader, UseAsyncLoaderReturnType } from '@/helper/hooks/useAsyncLoader';

import { GameType } from '@/types/game';
import { ResponseType } from '@/types/network';


export const useMultiGameDetail = (gameCodes: GameType['game_code'][], options?: ApiOptions): UseAsyncLoaderReturnType<GameType[]> => {
  const fetchReturn = useAsyncLoader<ResponseType<GameType>[]>(() => {
    return Promise.all([
      ...gameCodes.map((gameCode) => fetcher<GameType>('getGames', { param: gameCode, ...options }))
    ])
  })

  useEffect(() => {
    if (!gameCodes.length) return
    fetchReturn.run()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCodes.length])

  return { ...fetchReturn, data: fetchReturn.data?.map((gameResponse) => gameResponse.data) || [] }
}