import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';
import { getGameList } from '@/lib/api/games';

import AddRoomForm from '@/components/PageComponents/RoomPage/AddRoom/form';

const AddRoomPage = async () => {
  const games = await getGameList( { limit: 999999 } );
  const admins = await getAdmins( { limit: 999999 } );
  const cafes = await getCafes( { limit: 999999 } );
  return (
    <div>
      <AddRoomForm games={ games.data } admins={ admins.data } cafes={ cafes.data } />
    </div>
  );
};

export default AddRoomPage;