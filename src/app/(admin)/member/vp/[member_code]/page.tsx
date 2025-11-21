
import { Suspense } from 'react';

import { getMemberDetail, getUserVpHistory } from '@/lib/api/member';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import MemberVpHistoryPage from '@/components/PageComponents/MemberVpHistory';

import { Pagination } from '@/types/network';

type Props = {
  params: { member_code: string }
  searchParams: Omit<Pagination, 'keyword'>
};

const VpHistoryPage = async ({ params, searchParams }: Props) => {
  const pagination: Pagination = {
    order: 'created_date',
    sort: 'ASC',
    page: 1,
    limit: 10,
    ...searchParams
  }

  const memberDetail = await getMemberDetail(params.member_code);
  const userVpHistory = await getUserVpHistory(params.member_code, { pagination })

  return (
    <div>
      <Header title="User's VP History" subtitle={[{
        label: 'All Member Information',
        link: '/member'
      }, {
        label: `${memberDetail.data.fullname}'s VP History`,
        link: '#'
      }]} />
      <PageContainer>
        <Suspense>
          <MemberVpHistoryPage data={userVpHistory.data} memberData={memberDetail.data} pagination={userVpHistory.pagination} />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default VpHistoryPage;