'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithRef } from 'react';

import { Modal, ModalContent } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
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
      <ModalContent hideCloseIcon>
        <div className='gap-6 flex flex-col'>
          <section className='flex flex-row items-center gap-3'>
            <Image src={memberData?.image_url || '/images/avatar-not-found.png'} alt="member-detail-avatar" width={52} height={52} className='rounded-full' />
            <Typography variant='heading-h4'>
              {memberData?.fullname}
            </Typography>
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Username
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {memberData?.username}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Email Address
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {memberData?.email}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Phone Number
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {memberData?.phone_number}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Tier Level
            </Typography>
            <Typography variant='paragraph-xl-regular'>
              {memberData?.latest_tier || '-'}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section className='flex flex-col  gap-1'>
            <Typography variant='paragraph-l-regular'>
              Status
            </Typography>
            <Typography variant='paragraph-xl-regular' className='capitalize'>
              {memberData?.status}
            </Typography>
            <Separator className='mt-1' />
          </section>
          <section>
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