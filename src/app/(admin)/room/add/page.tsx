import { getAdmins } from '@/lib/api/admin';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddRoomForm from '@/components/PageComponents/RoomPage/AddRoom/form';

const AddRoomPage = async () => {
  const admins = await getAdmins({ limit: 999999 });

  return (
    <>
      <Header
        title='Room Play'
        subtitle={[
          { label: 'All Room Play Information', link: '/room' },
          { label: 'Add Room Play', link: '#' },
        ]}
      />
      <PageContainer>
        <AddRoomForm admins={admins.data} />
      </PageContainer>
    </>
  );
};

export default AddRoomPage;