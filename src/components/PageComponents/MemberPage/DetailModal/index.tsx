'use client';
import dayjs from 'dayjs';
import { Edit, Stickynote } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { PropsWithRef } from 'react';

import AdjustVpModal from '@/components/PageComponents/MemberPage/AdjustVpModal';
import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import TextLabel from '@/components/ui/TextLabel';
import Typography from '@/components/ui/Typography';

import { usePermissions } from '@/helper/context/permissionsContext';

import { MemberType } from '@/types/member';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberData?: MemberType;
}>;

const MemberDetailModal = ({ open, onOpenChange, memberData }: Props) => {
  const userPermissions = usePermissions().member
  const [openAdjustmentModal, setOpenVpAdjustmentModal] = React.useState<boolean>(false)
  const [openUserVpHistoryModal, setOpenUserVpHistoryModal] = React.useState<boolean>(false)
  const router = useRouter()

  const hasVPAccess = Boolean(userPermissions?.adjustVP || userPermissions?.showVpHistory)

  const navigate = (path: string) => router.push(path)

  return (
    <>
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
                  <TextLabel
                    title='Total of VP'
                    value={`${memberData?.stats.vp || 0} VP`}
                    actions={hasVPAccess && (
                      <div className='flex flex-row gap-4'>
                        {userPermissions?.adjustVP && (
                          <Button className='p-0' variant='link' title='Adjust VP' onClick={() => {
                            setOpenVpAdjustmentModal(true)
                          }}>
                            <Edit className='cursor-pointer' />
                          </Button>
                        )}
                        {userPermissions?.showVpHistory && (
                          <Button className='p-0' variant='link' title='Show History' onClick={() => {
                            navigate(`/member/vp/${memberData?.user_code}`)
                          }}>
                            <Stickynote className='cursor-pointer' />
                          </Button>
                        )}
                      </div>
                    )}
                  />
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
      {memberData?.user_code && (
        <>
          <AdjustVpModal member_code={memberData.user_code} onOpenChange={(isOpen) => setOpenVpAdjustmentModal(isOpen)} open={openAdjustmentModal} />
        </>
      )}
    </>
  );
};

export default MemberDetailModal;