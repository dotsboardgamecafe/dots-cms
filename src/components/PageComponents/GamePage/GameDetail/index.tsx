'use client'
// type Props = PropsWithRef<PropsWithChildren>;
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ShowQrModal from '@/components/PageComponents/GamePage/GameDetail/ShowQRModal';
import { Button } from '@/components/ui/Buttons';
import NextImage from '@/components/ui/Image';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { usePermissions } from '@/helper/context/permissionsContext';

import { GameType } from '@/types/game';

type Props = {
  gameDetail: GameType;
};

const GameDetail = ({ gameDetail }: Props) => {
  const gamePermission = usePermissions().games
  const [isShowQR, setIsShowQR] = useState<boolean>(false)

  return (
    <div className='flex flex-row gap-6 flex-wrap'>
      <Image src={gameDetail.image_url || '/images/broken-image.png'} alt='room-banner' width={375} height={215} className='rounded-xl h-[215px] w-auto' />
      <div className='flex flex-1 flex-col min-w-96'>
        <div className='grid grid-cols-2 gap-6'>
          <TextLabel title='Game Name' value={gameDetail.name} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Game Type' value={gameDetail.game_type} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Level' value={gameDetail.level} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Duration' value={`${gameDetail.duration} minutes`} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Players' value={`${gameDetail.minimal_participant} - ${gameDetail.maximum_participant}`} className='border-b border-gray-200 capitalize' />
          <TextLabel title='Cafe Location' value={gameDetail.cafe_name} className='border-b border-gray-200 capitalize' />
          <section className='grid col-span-2'>
            <TextLabel title='Game Mechanics' value={(
              <div className='flex flex-row flex-wrap gap-2 pb-4'>
                {gameDetail.game_categories?.map((category, categoryIndex) => <Typography key={categoryIndex} variant='paragraph-xl-regular' className='px-4 rounded-full bg-gray-100 w-fit'>{category.category_name}</Typography>)}
              </div>
            )} className='border-b border-gray-200 capitalize gap-2' />
          </section>
          <section className='grid col-span-2'>
            <TextLabel title='Game Masters' className='border-b border-gray-200 capitalize gap-2'>
              <div className='flex gap-6'>
                {gameDetail.game_masters?.map((gm) => (
                  <div key={gm.admin_code} className='flex flex-row flex-wrap gap-2 pb-4 items-center'>
                    <NextImage enableViewer alt='game_master' src={gm?.image_url || '/images/avatar-not-found.png'} height={32} width={32} className='w-8 h-8 rounded-full overflow-hidden' classNames={{ image: 'w-full h-full object-center object-cover' }} />
                    <Typography variant='paragraph-xl-regular'>
                      {gm?.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </TextLabel>
          </section>
          <section className='grid col-span-2'>
            <TextLabel title='Description' value={gameDetail.description} className='border-b border-gray-200 capitalize' />
          </section>
          <section className='grid col-span-2'>
            <TextLabel title='Game Board' value={(
              <div className='flex flex-row flex-wrap gap-2 pb-4'>
                {gameDetail.collection_url.map((imageUrl, imageIndex) => <NextImage width={92} height={92} key={imageIndex} src={imageUrl} alt='game-board' enableViewer />)}
              </div>
            )} className='border-b border-gray-200 capitalize gap-2' />
          </section>
          <section className='flex items-center gap-4 col-span-2'>
            <Button variant='default' onClick={() => setIsShowQR(true)}>Show QR-Code</Button>
            {gamePermission?.update && (
              <Typography variant='text-body-l-regular' className='text-brand-blue-electric'>
                <Link href={`/game/edit/${gameDetail.game_code}`}>
                  Click here to Edit
                </Link>
              </Typography>
            )}
          </section>
        </div>
      </div>
      <ShowQrModal open={isShowQR} onOpenChange={(isOpen) => setIsShowQR(isOpen)} gameTitle={gameDetail.name} gameId={gameDetail.game_code} />
    </div>
  );
};

export default GameDetail;