'use client';
import Image from 'next/image';
import { PropsWithRef } from 'react';

import { useBadgeDetail } from '@/lib/api/badge/hooks';

import CriteriaCard from '@/components/PageComponents/BadgePage/Card/CriteriaCard';
import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent, ModalHeader } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { BadgeType } from '@/types/badge';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  badgeCode?: BadgeType['badge_code'];
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
}>;

const ViewBadgeDetailModal = ({ open, onOpenChange, badgeCode = '', onEdit }: Props) => {
  const { data: badgeData } = useBadgeDetail(badgeCode)

  if (!badgeData) return null

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-w-3xl gap-6'>
        <ModalHeader className='flex-row items-center gap-4'>
          <Image src={badgeData.image_url || '/images/broken-image.png'} width={64} height={64} className='rounded-full w-16 h-16 object-cover object-center' alt='badge-image' />
          <Typography variant='text-body-xl-heavy' className='h-fit m-0'>
            {badgeData.name || '-'}
          </Typography>
        </ModalHeader>
        <div className='gap-6 flex flex-col'>
          <div className='grid grid-cols-2 gap-6'>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                Badge Category
              </Typography>
              <Typography variant='paragraph-xl-regular'>
                {badgeData.badge_category || '-'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                VP Amount
              </Typography>
              <Typography variant='paragraph-xl-regular'>
                {badgeData.vp_point || '-'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                Required Criteria
              </Typography>
              <Typography variant='paragraph-xl-regular' className='capitalize'>
                {badgeData.badge_rules?.length ? `Selected ${badgeData.badge_rules.length} criteria` : 'No criteria'}
              </Typography>
              <Separator className='mt-1' />
            </section>
            <section className='flex flex-col  gap-1'>
              <Typography variant='paragraph-l-regular'>
                Status
              </Typography>
              <Typography variant='paragraph-xl-regular' className='capitalize'>
                {badgeData.status}
              </Typography>
              <Separator className='mt-1' />
            </section>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            {badgeData.badge_rules?.map((criteria) => <CriteriaCard key={criteria.badge_rule_code} criteria={criteria} />)}
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

export default ViewBadgeDetailModal;