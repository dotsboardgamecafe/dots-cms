'use client';


// type Props = PropsWithRef<PropsWithChildren>;
import { InfoCircle, People } from 'iconsax-react';
import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';
import { CafeType } from '@/types/cafes';
import { GameType } from '@/types/game';
import { RoomDetailType } from '@/types/room';

type Props = {
  games: GameType[];
  admins: AdminType[];
  cafes: CafeType[];
  roomDetail: RoomDetailType;
};

const RoomDetail = ( { games, admins, cafes, roomDetail }: Props ) => {
  return (
    <div className='flex flex-row gap-6'>
      <Image src={ roomDetail.room_banner_url || '/images/broken-image.png' } alt='room-banner' width={ 375 } height={ 215 } className='rounded-xl h-[215px]' />
      <div className='flex flex-1 flex-col'>
        <Tabs defaultValue="account" className='w-full gap-6 flex flex-col'>
          <TabsList className='gap-6'>
            <TabsTrigger value="general-information" className='gap-2'>
              <InfoCircle size={ 24 } variant='Bold' />
              <Typography variant='text-body-xxl-heavy'>
                General Information
              </Typography>
            </TabsTrigger>
            <TabsTrigger value="players" className='gap-2'>
              <People size={ 24 } />
              <Typography variant='text-body-xxl-heavy'>
                Join Players
              </Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general-information">
            <div className='grid grid-cols-2 gap-4'>
              <section className='flex flex-col gap-4'>
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
              </section>

              <section className='flex flex-col gap-4'>
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
                <TextLabel title='Room Type' value="General Room" className='border-b border-gray-200' />
              </section>
              <section className='grid col-span-2'>
                <TextLabel title='Short description' value="Join me for a thrilling adventure in the world of Rising Sun -  Let's play together and have a blast!" className='border-b border-gray-200' />
              </section>
            </div>
          </TabsContent>
          <TabsContent value="players">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomDetail;