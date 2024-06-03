'use client';
import Image from 'next/image';
import { PropsWithRef } from 'react';

import { useTournamentBadgeDetail } from '@/lib/api/badge/hooks';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent, ModalHeader } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { TournamentBadgeType } from '@/types/badge';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  badgeCode?: TournamentBadgeType['parent_code'];
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
}>;

const ViewTournamentBadgeDetailModal = ({ open, onOpenChange, badgeCode = '', onEdit }: Props) => {
  const { data: badgeDataList } = useTournamentBadgeDetail(badgeCode)
  const badgeDataFirst = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 1)
  const badgeDataSecond = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 2)
  const badgeDataThird = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 3)

  if (!badgeDataFirst || !badgeDataSecond || !badgeDataThird) return null

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-w-3xl gap-6'>
        <ModalHeader className='flex-row items-center gap-4'>
          <Typography variant='text-body-xl-heavy' className='h-fit m-0'>
            {badgeDataFirst.name || '-'}
          </Typography>
        </ModalHeader>
        <div className='gap-6 flex flex-col'>
          <div className='flex flex-row gap-6'>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                1st winner badge
              </Typography>
              <Image src={badgeDataFirst.image_url || '/images/broken-image.png'} width={64} height={64} className='rounded-full w-16 h-16 object-cover object-center' alt='badge-image' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                2nd winner badge
              </Typography>
              <Image src={badgeDataSecond.image_url || '/images/broken-image.png'} width={64} height={64} className='rounded-full w-16 h-16 object-cover object-center' alt='badge-image' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                3rd winner badge
              </Typography>
              <Image src={badgeDataThird.image_url || '/images/broken-image.png'} width={64} height={64} className='rounded-full w-16 h-16 object-cover object-center' alt='badge-image' />
            </section>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                Badge Category
              </Typography>
              <Typography variant='paragraph-xl-regular' className='capitalize'>
                {badgeDataFirst.badge_category || '-'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                VP Amount 1st
              </Typography>
              <Typography variant='paragraph-xl-regular'>
                {badgeDataFirst.vp_point || '-'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                VP Amount 2nd
              </Typography>
              <Typography variant='paragraph-xl-regular'>
                {badgeDataSecond.vp_point || '-'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                VP Amount 3rd
              </Typography>
              <Typography variant='paragraph-xl-regular'>
                {badgeDataThird.vp_point || '-'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                Status
              </Typography>
              <Typography variant='paragraph-xl-regular' className='capitalize'>
                {badgeDataFirst.status}
              </Typography>
              <Separator className='mt-1' />
            </section>
          </div>
          <section>
            <Button variant='link' className='p-0' onClick={onEdit}>
              <Typography variant='text-body-l-regular' className='text-brand-blue-electric'>
                Click here to Edit
              </Typography>
            </Button>
          </section>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ViewTournamentBadgeDetailModal;