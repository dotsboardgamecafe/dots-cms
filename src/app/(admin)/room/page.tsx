'use server';


import { getRooms } from '@/lib/api/room';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import RoomTable from '@/components/PageComponents/RoomPage/DataTable';

const RoomPage = async () => {

  const rooms = await getRooms();

  return (
    <>
      <Header title='Room Play' subtitle={ [ {
        label: 'All Room Play Information',
        link: '/room'
      } ] } />
      <PageContainer>
        <RoomTable data={ rooms.data } pagination={ rooms.pagination } />
      </PageContainer>
    </>

  );
};

export default RoomPage;