// type Props = PropsWithRef<PropsWithChildren>;
import { InfoCircle, People } from 'iconsax-react';
import Image from 'next/image';

import PlayersTab from '@/components/PageComponents/RoomPage/RoomDetail/Players';
import RoomInfo from '@/components/PageComponents/RoomPage/RoomDetail/RoomInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
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
        <Tabs defaultValue="general-information" className='w-full gap-6 flex flex-col'>
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
            <RoomInfo roomDetail={ roomDetail } />
          </TabsContent>
          <TabsContent value="players">
            <PlayersTab players={ roomDetail.room_participants } />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomDetail;