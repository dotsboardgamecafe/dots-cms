import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddRoomPayload, RoomDetailType, RoomType } from '@/types/room';

export const getRooms = async ( options?: ApiOptions ) => {
  return await fetcher<RoomType[]>( 'getRooms', options );
};

export const getRoomDetail = async ( options: ApiOptions ) => {
  return await fetcher<RoomDetailType>( 'getRoomDetail', options );
};

export const createRoom = async ( options: ApiOptions<AddRoomPayload> ) => {
  return await fetcher( 'createRoom', options );
};