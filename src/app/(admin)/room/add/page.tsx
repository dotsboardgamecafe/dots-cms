import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';
import { getGameList } from '@/lib/api/games';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddRoomForm from '@/components/PageComponents/RoomPage/AddRoom/form';

const AddRoomPage = async () => {
  const games = await getGameList( { limit: 999999 } );
  const admins = await getAdmins( { limit: 999999 } );
  const cafes = await getCafes( { limit: 999999 } );

  return (
    <>
      <Header
        title='Room Play'
        subtitle={ [
          { label: 'All Room Play Information', link: '/room' },
          { label: 'Add Room Play', link: '#' },
        ] }
      />
      <PageContainer>
        <AddRoomForm games={ games.data } admins={ admins.data } cafes={ cafes.data } />
      </PageContainer>
    </>
  );
};

export default AddRoomPage;