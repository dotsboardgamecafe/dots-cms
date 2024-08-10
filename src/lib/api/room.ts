'use server';
import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddRoomPayload, RoomDetailType, RoomType, SetRoomWinnerPayload } from '@/types/room';

export const getRooms = async (options?: ApiOptions) => {
  return await fetcher<RoomType[]>('getRooms', { ...options, requestOpt: { next: { tags: ['rooms'] } } });
};

export const getRoomDetail = async (options: ApiOptions) => {
  return await fetcher<RoomDetailType>('getRoomDetail', { ...options, requestOpt: { next: { tags: ['room-detail'] } } });
};

export const createRoom = async (options: ApiOptions<AddRoomPayload>) => {
  const res = await fetcher('createRoom', options);
  revalidateTag('rooms');
  return res;
};

export const updateRoom = async (options: ApiOptions<AddRoomPayload>) => {
  const res = await fetcher('updateRoom', options);
  revalidateTag('rooms');
  return res;
};

export const updateRoomStatus = async (options: ApiOptions) => {
  const res = await fetcher('updateRoomStatus', options);
  revalidateTag('rooms');
  return res;
};

export const setRoomWinner = async (options: ApiOptions<SetRoomWinnerPayload>) => {
  await fetcher('setRoomWinner', options);
  revalidateTag('room-detail');
};

export const deleteRoom = async (room_code: RoomType['room_code']) => {
  const res = await fetcher('deleteRoom', { param: room_code });
  revalidateTag('rooms');
  return res;
};