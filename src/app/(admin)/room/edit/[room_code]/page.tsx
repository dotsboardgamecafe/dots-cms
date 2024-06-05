import { getAdmins } from '@/lib/api/admin';
import { getRoomDetail } from '@/lib/api/room';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import EditRoomForm from '@/components/PageComponents/RoomPage/EditRoom';

const AddRoomPage = async ({ params: { room_code } }: { params: { room_code: string; }; }) => {
  const admins = await getAdmins({ limit: 999999 });
  const roomDetail = await getRoomDetail({ param: room_code });
  return (
    <>
      <Header
        title='Room Play'
        subtitle={[
          { label: 'All Room Play Information', link: '/room' },
          { label: `Edit ${roomDetail.data.name} room`, link: '#' },
        ]}
      />
      <PageContainer>
        <EditRoomForm admins={admins.data} roomDetail={roomDetail.data} />
      </PageContainer>
    </>
  );
};

export default AddRoomPage;