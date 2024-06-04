// type Props = PropsWithRef<PropsWithChildren>;
import { InfoCircle, People } from 'iconsax-react';
import Image from 'next/image';

import TournamentPlayers from '@/components/PageComponents/TournamentPage/TournamentDetail/player-tab';
import TournamentInfo from '@/components/PageComponents/TournamentPage/TournamentDetail/tournament-info-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Typography from '@/components/ui/Typography';

import { TournamentDetailType } from '@/types/tournament';

type Props = {
  tournamentDetail: TournamentDetailType;
};

const TournamentDetail = ({ tournamentDetail }: Props) => {
  return (
    <div className='flex flex-row gap-6'>
      <Image src={tournamentDetail.image_url || '/images/broken-image.png'} alt='tournament-banner' width={375} height={215} className='rounded-xl h-[215px]' />
      <div className='flex flex-1 flex-col'>
        <Tabs defaultValue="general-information" className='w-full gap-6 flex flex-col'>
          <TabsList className='gap-6'>
            <TabsTrigger value="general-information" className='gap-2'>
              <InfoCircle size={24} variant='Bold' />
              <Typography variant='text-body-xxl-heavy'>
                General Information
              </Typography>
            </TabsTrigger>
            <TabsTrigger value="players" className='gap-2'>
              <People size={24} />
              <Typography variant='text-body-xxl-heavy'>
                Join Players
              </Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general-information">
            <TournamentInfo tournamentDetail={tournamentDetail} />
          </TabsContent>
          <TabsContent value="players">
            <TournamentPlayers badges={tournamentDetail.tournament_badges} players={tournamentDetail.tournament_participants} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetail;