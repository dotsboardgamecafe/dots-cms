
import { Suspense } from 'react';

import { getMembers } from '@/lib/api/member';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import MemberTable from '@/components/PageComponents/MemberPage/MemberTable';

import { Pagination } from '@/types/network';
type Props = {
  searchParams: Pagination & {
    keyword?: string;
  };
};

const MemberPage = async ({ searchParams }: Props) => {
  const isFilterByAllStatus = searchParams.status === 'all'
  const query: Record<string, unknown> = { status: 'active', ...searchParams }

  if (isFilterByAllStatus) delete query.status
  const members = await getMembers({ query });

  return (
    <div>
      <Header title='Member Control' subtitle={[{
        label: 'All Member Information',
        link: '/member'
      }]} />
      <PageContainer>
        <Suspense>
          <MemberTable data={members.data} pagination={members.pagination} />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default MemberPage;