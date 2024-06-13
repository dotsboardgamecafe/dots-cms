'use client';
import dayjs from 'dayjs';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';
import { z } from 'zod';

import { updateReward } from '@/lib/api/reward';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';

import { RewardAddSchema, RewardType } from '@/types/rewards';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rewardData?: RewardType | null;
}>;

const RewardStatusConfirmationModal = ({ open, onOpenChange, rewardData }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (!rewardData) return null

  const onConfirm = async () => {
    setIsLoading(true)
    const payload: z.infer<typeof RewardAddSchema> = {
      category_type: rewardData.category_type,
      expired_date: dayjs(rewardData.expired_date).format('YYYY-MM-DD'),
      image_url: rewardData.image_url,
      name: rewardData.name,
      tier_code: rewardData.Tier.tier_code,
      status: rewardData.status === 'active' ? 'inactive' : 'active'
    }
    await updateReward({ param: rewardData?.reward_code, body: payload });
    onOpenChange(false);
    setIsLoading(false)
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-yellow-500 flex items-center justify-center border-[6px] border-yellow-100'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to {rewardData.status === 'active' ? 'inactive' : 'activate'} the {rewardData.name} voucher?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} loading={isLoading} disabled={isLoading}>Yes, {rewardData.status === 'active' ? 'inactive' : 'activate'} it</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default RewardStatusConfirmationModal;