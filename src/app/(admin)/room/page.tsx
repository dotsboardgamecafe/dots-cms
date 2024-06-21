'use server';


import { getRooms } from '@/lib/api/room';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import RoomTable from '@/components/PageComponents/RoomPage/DataTable';

import { Pagination } from '@/types/network';

const RoomPage = async ({ searchParams }: { searchParams: Pagination; }) => {
  const rooms = await getRooms({ pagination: { order: 'tournaments.status,days_past_end_date', sort: 'ASC,ASC', ...searchParams } });
  return (
    <>
      <Header title='Room Play' subtitle={[{
        label: 'All Room Play Information',
        link: '/room'
      }]} />
      <PageContainer>
        <RoomTable data={rooms.data} pagination={rooms.pagination} />
      </PageContainer>
    </>

  );
};

export default RoomPage;