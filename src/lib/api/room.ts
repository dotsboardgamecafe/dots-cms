'use server';
import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddRoomPayload, RoomDetailType, RoomType, SetRoomWinnerPayload } from '@/types/room';

export const getRooms = async ( options?: ApiOptions ) => {
  return await fetcher<RoomType[]>( 'getRooms', options );
};

export const getRoomDetail = async ( options: ApiOptions ) => {
  return await fetcher<RoomDetailType>( 'getRoomDetail', { ...options, requestOpt: { next: { tags: [ 'room-detail' ] } } } );
};

export const createRoom = async ( options: ApiOptions<AddRoomPayload> ) => {
  return await fetcher( 'createRoom', options );
};

export const updateRoom = async ( options: ApiOptions<AddRoomPayload> ) => {
  return await fetcher( 'updateRoom', options );
};

export const updateRoomStatus = async ( options: ApiOptions ) => {
  return await fetcher( 'updateRoomStatus', options );
};

export const setRoomWinner = async ( options: ApiOptions<SetRoomWinnerPayload> ) => {
  await fetcher( 'setRoomWinner', options );
  revalidateTag( 'room-detail' );
};