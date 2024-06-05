import { getRoomDetail } from '@/lib/api/room';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import RoomDetail from '@/components/PageComponents/RoomPage/RoomDetail';

const ViewRoomPage = async ({ params: { room_code } }: { params: { room_code: string; }; }) => {
  const roomDetail = await getRoomDetail({ param: room_code });

  return (
    <>
      <Header
        title='Room Play'
        subtitle={[
          { label: 'All Room Play Information', link: '/room' },
          { label: `View ${roomDetail.data.name} room`, link: '#' },
        ]}
      />
      <PageContainer>
        <RoomDetail roomDetail={roomDetail.data} />
      </PageContainer>
    </>
  );
};

export default ViewRoomPage;