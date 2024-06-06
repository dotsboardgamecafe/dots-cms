'use server'

import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddGamePayload, GameType } from '@/types/game';


export const getGameList = async (options?: ApiOptions) => {
  return await fetcher<GameType[]>('getGames', { ...options, requestOpt: { next: { tags: ['getGameList'] } } });
};

export const addGame = async (options: ApiOptions) => {
  const res = await fetcher<AddGamePayload>('addGame', options);
  revalidateTag('getGames')
  return res
};

export const editGame = async (options: ApiOptions) => {
  const res = await fetcher<AddGamePayload>('editGame', options);
  revalidateTag('getGames')
  revalidateTag(`get-game-detail-${options.param}`)
  return res
};

export const getGameDetail = async (gameCode: string, options?: ApiOptions) => {
  return await fetcher<GameType>('getGames', { ...options, param: gameCode, requestOpt: { next: { tags: [`get-game-detail-${gameCode}`] } } })
}