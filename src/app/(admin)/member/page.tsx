
import { Suspense } from 'react';

import { getMembers } from '@/lib/api/member';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import MemberTable from '@/components/PageComponents/MemberPage/MemberTable';
type Props = {
  searchParams: {
    keyword?: string;
  };
};

const MemberPage = async ( { searchParams }: Props ) => {
  const members = await getMembers( { query: searchParams } );
  return (
    <div>
      <Header title='Member Control' subtitle={ [ {
        label: 'All Member Information',
        link: '/member'
      } ] } />
      <PageContainer>
        <Suspense>
          <MemberTable data={ members.data } pagination={ members.pagination } />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default MemberPage;