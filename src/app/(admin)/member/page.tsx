
import { getMembers } from '@/lib/api/room';

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
      <MemberTable data={ members.data } pagination={ members.pagination } />
    </div>
  );
};

export default MemberPage;