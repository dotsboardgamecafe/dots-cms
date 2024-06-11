'use client'

import TextLabel from '@/components/ui/TextLabel';

import { formatRoomSchedule } from '@/helper/datetime';
import { currencyFormat } from '@/helper/string';

import { RoomDetailType } from '@/types/room';

type Props = {
  roomDetail: RoomDetailType;
};

const RoomInfo = ({ roomDetail }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <TextLabel title='Room Type' value={roomDetail.room_type} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Game Name' value={roomDetail.game_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Game Master' value={roomDetail.game_master_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Schedule' value={formatRoomSchedule(roomDetail.start_date, roomDetail.end_date)} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Location' value={roomDetail.cafe_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Level' value={roomDetail.difficulty} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Updated Slot' value={`${roomDetail.current_used_slot} / ${roomDetail.maximum_participant} Players `} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Price' value={currencyFormat(roomDetail.booking_price)} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Points' value={`${roomDetail.reward_point} Points`} className='border-b border-gray-200 capitalize' />
      <section className='grid col-span-2'>
        <TextLabel title='Short description' value={roomDetail.description} className='border-b border-gray-200 capitalize' />
      </section>
    </div>
  );
};

export default RoomInfo;