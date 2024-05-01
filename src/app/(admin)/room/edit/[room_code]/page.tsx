import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';
import { getGameList } from '@/lib/api/games';
import { getRoomDetail } from '@/lib/api/room';

import EditRoomForm from '@/components/PageComponents/RoomPage/EditRoom';

const AddRoomPage = async ( { params: { room_code } }: { params: { room_code: string; }; } ) => {
  const games = await getGameList( { limit: 999999 } );
  const admins = await getAdmins( { limit: 999999 } );
  const cafes = await getCafes( { limit: 999999 } );
  const roomDetail = await getRoomDetail( { param: room_code } );
  return (
    <div>
      <EditRoomForm games={ games.data } admins={ admins.data } cafes={ cafes.data } roomDetail={ roomDetail.data } />
    </div>
  );
};

export default AddRoomPage;