'use client'

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Buttons';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { formatRoomSchedule } from '@/helper/datetime';
import { currencyFormat } from '@/helper/string';

import { RoomDetailType } from '@/types/room';

type Props = {
  roomDetail: RoomDetailType;
};

const RoomInfo = ({ roomDetail }: Props) => {
  const router = useRouter()
  return (
    <div className='grid grid-cols-2 gap-6'>
      <TextLabel title='Room Type' value={roomDetail.room_type} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Game Name' value={roomDetail.game_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Game Master' value={roomDetail.game_master_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Schedule' value={formatRoomSchedule(roomDetail.start_date, roomDetail.end_date, roomDetail.start_time, roomDetail.end_time)} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Location' value={roomDetail.cafe_name} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Level' value={roomDetail.difficulty} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Updated Slot' value={`${roomDetail.current_used_slot} / ${roomDetail.maximum_participant} Players `} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Price' value={currencyFormat(roomDetail.booking_price)} className='border-b border-gray-200 capitalize' />
      <TextLabel title='Points' value={`${roomDetail.reward_point} Points`} className='border-b border-gray-200 capitalize' />
      <section className='grid col-span-2'>
        <TextLabel title='Short description' value={roomDetail.description} className='border-b border-gray-200 capitalize' />
      </section>
      <section className='grid col-span-2'>
        <Button variant='link' className='text-brand-blue-electric p-0 justify-start' onClick={() => router.push(`/room/edit/${roomDetail.room_code}`)}>
          <Typography variant='text-body-l-regular' className='text-brand-blue-electric'>
            Click here to Edit
          </Typography>
        </Button>
      </section>
    </div>
  );
};

export default RoomInfo;