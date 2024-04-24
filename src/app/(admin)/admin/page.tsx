

import { getAdmins } from '@/lib/api/admin';

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
      <AdminTable data={ admins.data } pagination={ admins.pagination } />
    </div>
  );
};

export default AdminPage;