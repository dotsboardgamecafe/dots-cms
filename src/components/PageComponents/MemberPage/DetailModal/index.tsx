'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithRef } from 'react';

import { Modal, ModalContent } from '@/components/ui/Modal';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { MemberType } from '@/types/member';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberData?: MemberType;
}>;

const MemberDetailModal = ({ open, onOpenChange, memberData }: Props) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='max-h-[90%] overflow-hidden flex flex-col'>
        <div className='gap-6 flex flex-col overflow-hidden'>
          <section className='flex flex-row items-center gap-3'>
            <Image src={memberData?.image_url || '/images/avatar-not-found.png'} alt="member-detail-avatar" width={52} height={52} className='rounded-full' />
            <Typography variant='heading-h4'>
              {memberData?.fullname}
            </Typography>
          </section>
          <section className='flex flex-col gap-6 flex-grow overflow-y-auto'>
            <TextLabel title='Username' value={memberData?.username} />
            <TextLabel title='Email Address' value={memberData?.email} />
            <TextLabel title='Phone Number' value={memberData?.phone_number} />
            <TextLabel title='Tier Level' value={memberData?.latest_tier} />
            <TextLabel title='Total Spent' value={`Rp ${memberData?.total_spent || 0}`} />
            <TextLabel title='Status' value={memberData?.status} className='capitalize' />
            <Link href={`/member/invoices/${memberData?.user_code}`}>
              <Typography variant='text-body-l-regular' className='text-brand-blue-electric'>
                View invoice history
              </Typography>
            </Link>
          </section>
        </div>
      </ModalContent>
    </Modal >
  );
};

export default MemberDetailModal;