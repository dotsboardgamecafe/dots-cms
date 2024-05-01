'use server';


import { getRooms } from '@/lib/api/room';

import RoomTable from '@/components/PageComponents/RoomPage/DataTable';

const RoomPage = async () => {

  const rooms = await getRooms();

  return (
    <div>
      <RoomTable data={ rooms.data } pagination={ rooms.pagination } />
    </div>
  );
};

export default RoomPage;