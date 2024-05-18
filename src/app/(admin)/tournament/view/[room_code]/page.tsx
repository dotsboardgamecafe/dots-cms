import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';
import { getGameList } from '@/lib/api/games';
import { getRoomDetail } from '@/lib/api/room';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import RoomDetail from '@/components/PageComponents/RoomPage/RoomDetail';

const ViewRoomPage = async ( { params: { room_code } }: { params: { room_code: string; }; } ) => {
  const games = await getGameList( { limit: 999999 } );
  const admins = await getAdmins( { limit: 999999 } );
  const cafes = await getCafes( { limit: 999999 } );
  const roomDetail = await getRoomDetail( { param: room_code } );

  return (
    <>
      <Header
        title='Room Play'
        subtitle={ [
          { label: 'All Room Play Information', link: '/room' },
          { label: `View ${roomDetail.data.name} room`, link: '#' },
        ] }
      />
      <PageContainer>
        <RoomDetail games={ games.data } admins={ admins.data } cafes={ cafes.data } roomDetail={ roomDetail.data } />
      </PageContainer>
    </>
  );
};

export default ViewRoomPage;