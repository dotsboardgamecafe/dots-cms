

import { Suspense } from 'react';

import { getAdmins } from '@/lib/api/admin';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AdminTable from '@/components/PageComponents/AdminPage/AdminTable';

import { Pagination } from '@/types/network';
type Props = {
  searchParams: Pagination & {
    keyword?: string;
  };
};

const AdminPage = async ({ searchParams }: Props) => {
  const isFilterByAllStatus: boolean = searchParams.status === 'all'
  const query: Record<string, unknown> = { status: 'active', ...searchParams }

  if (isFilterByAllStatus) delete query.status

  const admins = await getAdmins({ query });

  return (
    <div>
      <Header title='Admin Control' subtitle={[{
        label: 'All Admin Information',
        link: '/admin'
      }]} />
      <PageContainer>
        <Suspense>
          <AdminTable data={admins.data} pagination={admins.pagination} />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default AdminPage;