'use server';


import { getRooms } from '@/lib/api/room';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import RoomTable from '@/components/PageComponents/RoomPage/DataTable';

const RoomPage = async () => {

  const rooms = await getRooms();

  return (
    <>
      <Header title='Tournament' subtitle={ [ {
        label: 'All Tournament Information',
        link: '/tournament'
      } ] } />
      <PageContainer>
        <RoomTable data={ rooms.data } pagination={ rooms.pagination } />
      </PageContainer>
    </>

  );
};

export default RoomPage;