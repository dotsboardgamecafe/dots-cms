

import { Suspense } from 'react';

import { getAdmins } from '@/lib/api/admin';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AdminTable from '@/components/PageComponents/AdminPage/AdminTable';

import { cookiesHelper } from '@/helper';
import { EnhancedPermissionType } from '@/helper/hooks/usePermissions';

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
  const permissions: string[] = await cookiesHelper.getUserPermission()
  const adminPermissions: EnhancedPermissionType = permissions.reduce((result, permission) => {
    if (!permission.includes('admin')) return result
    return ({
      ...result,
      [permission]: true
    })
  }, {});

  return (
    <div>
      <Header title='Admin Control' subtitle={[{
        label: 'All Admin Information',
        link: '/admin'
      }]} />
      <PageContainer>
        <Suspense>
          <AdminTable data={admins.data} pagination={admins.pagination} adminPermissions={adminPermissions || {}} />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default AdminPage;