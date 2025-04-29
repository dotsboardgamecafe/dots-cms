'use client';
import dayjs from 'dayjs';
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
            <TextLabel title='Gender' value={memberData?.gender || 'n/a'} className={memberData?.gender ? 'capitalize' : ''} />
            <TextLabel title='Date of Birth' value={memberData?.date_of_birth ? dayjs(memberData?.date_of_birth).format('DD MMMM, YYYY') : 'n/a'} />
            <TextLabel title='Email Address' value={memberData?.email} />
            <TextLabel title='Phone Number' value={memberData?.phone_number} />
            <TextLabel title='Tier Level' value={memberData?.latest_tier} />
            <TextLabel title='Total Spent' value={`Rp ${memberData?.total_spent || 0}`} />
            {memberData?.stats && (
              <>
                <TextLabel title='Total of Board Games Played' value={`${memberData?.stats.game || 0} Board games`} />
                <TextLabel title='Total of VP' value={`${memberData?.stats.vp || 0} VP`} />
                <TextLabel title='Total of Badges' value={`${memberData?.stats.badge || 0} Badges`} />
                <TextLabel title='Total of Joined Sessions' value={`${memberData?.stats.room_normal || 0} Sessions`} />
                <TextLabel title='Total of Joined Events' value={`${memberData?.stats.room_event || 0} Events`} />
                <TextLabel title='Total of Joined Tournaments' value={`${memberData?.stats.tournament || 0} Tournamnets`} />
              </>
            )}
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