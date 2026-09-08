'use server';
import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddRoomParticipantPayload, AddRoomPayload, RemoveRoomParticipant, RoomDetailType, RoomType, SetRoomWinnerPayload } from '@/types/room';

export const getRooms = async (options?: ApiOptions) => {
  return await fetcher<RoomType[]>('getRooms', { ...options, requestOpt: { next: { tags: ['rooms'] } } });
};

export const getRoomDetail = async (options: ApiOptions) => {
  return await fetcher<RoomDetailType>('getRoomDetail', { ...options, requestOpt: { next: { tags: ['room-detail'] } } });
};

const ROOM_DETAIL_CONCURRENCY = 6;

export const getRoomPlayDetails = async (roomCodes: string[]) => {
  if (!Array.isArray(roomCodes)) return [];
  const details: (RoomDetailType | undefined)[] = [];

  for (let index = 0; index < roomCodes.length; index += ROOM_DETAIL_CONCURRENCY) {
    const wave = roomCodes.slice(index, index + ROOM_DETAIL_CONCURRENCY);
    const settled = await Promise.allSettled(wave.map((room_code) => getRoomDetail({ param: room_code })));
    settled.forEach((result) => details.push(result.status === 'fulfilled' ? result.value.data : undefined));
  }

  return details;
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
  const res = await fetcher('setRoomWinner', options);
  revalidateTag('room-detail');
  return res
};

export const removeRoomParticipant = async (options: ApiOptions<RemoveRoomParticipant>) => {
  const res = await fetcher('deleteRoomParticipant', options);
  if (!res.stat_code?.includes('ERR')) revalidateTag('room-detail');
  return res
};

export const addRoomParticipant = async (options: ApiOptions<AddRoomParticipantPayload>) => {
  const res = await fetcher('addRoomParticipant', options);
  if (!res.stat_code?.includes('ERR')) revalidateTag('room-detail');
  return res
};

export const deleteRoom = async (room_code: RoomType['room_code']) => {
  const res = await fetcher('deleteRoom', { param: room_code });
  revalidateTag('rooms');
  return res;
};