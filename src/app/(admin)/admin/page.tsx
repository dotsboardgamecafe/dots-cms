

import { Suspense } from 'react';

import { getAdmins } from '@/lib/api/admin';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AdminTable from '@/components/PageComponents/AdminPage/AdminTable';
type Props = {
  searchParams: {
    keyword?: string;
  };
};

const AdminPage = async ( { searchParams }: Props ) => {
  const admins = await getAdmins( { query: searchParams } );
  return (
    <div>
      <Header title='Admin Control' subtitle={ [ {
        label: 'All Admin Information',
        link: '/admin'
      } ] } />
      <PageContainer>
        <Suspense>
          <AdminTable data={ admins.data } pagination={ admins.pagination } />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default AdminPage;