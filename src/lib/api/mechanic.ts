
'use server';
import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from "@/lib/api/utils/fetcher";

import { GameMechanicPayload, MechanicType } from '@/types/mechanics';


export const getMechanics = async (options?: ApiOptions) => {
  return await fetcher<MechanicType[]>('getGameMechanics', {
    ...options, requestOpt: {
      next: {
        tags: ['get-mechanics']
      }
    }
  });
};

export const addMechanics = async (body: GameMechanicPayload) => {
  const res = await fetcher('addGameMechanics', { body });
  revalidateTag('get-mechanics');
  return res;
};

export const updateMechanics = async (param: ApiOptions['param'], body: GameMechanicPayload) => {
  const res = await fetcher('updateGameMechanics', { param, body });
  revalidateTag('get-mechanics');
  return res
};

export const deleteMechanics = async (param: ApiOptions['param']) => {
  const res = await fetcher('deleteGameMechanics', { param });
  revalidateTag('get-mechanics');
  return res
};