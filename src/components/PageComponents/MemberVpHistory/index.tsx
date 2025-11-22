'use client';
import { PropsWithRef, useState } from 'react';

import AdjustVpModal from '@/components/PageComponents/MemberPage/AdjustVpModal';
import UserVpHistoryTable from '@/components/PageComponents/MemberVpHistory/Table/user-vp-history-table';
import { Button } from '@/components/ui/Buttons';
import Typography from '@/components/ui/Typography';

import { usePermissions } from '@/helper/context/permissionsContext';

import { MemberType, UserVpHistory } from '@/types/member';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: UserVpHistory[];
  pagination: PaginationRes;
  memberData: MemberType
}>;

const MemberVpHistoryPage = ({ memberData, data, pagination }: Props) => {
  const memberPermission = usePermissions().member

  const [openAdjustVpModal, setOpenAdjustVpModal] = useState<boolean>(false);

  return (
    <div className='flex flex-col gap-6'>
      {memberPermission?.adjustVP && (
        <section className='table-action'>
          <Typography variant='heading-h4'>Total VP: {memberData.stats?.vp || memberData.latest_point || 0}</Typography>
          <Button variant="default" size="md" onClick={() => setOpenAdjustVpModal(true)}>
            <Typography variant='paragraph-l-bold'>
              Adjust VP
            </Typography>
          </Button>
        </section>
      )}
      <UserVpHistoryTable data={data} pagination={pagination} />
      <AdjustVpModal member_code={memberData.user_code} onOpenChange={(isOpen) => setOpenAdjustVpModal(isOpen)} open={openAdjustVpModal} />
    </div>
  );
};

export default MemberVpHistoryPage;