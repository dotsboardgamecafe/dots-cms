
import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddRoomForm from '@/components/PageComponents/RoomPage/AddRoom/form';

const AddRoomPage = async () => {

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
        <AddRoomForm />
      </PageContainer>
    </>
  );
};

export default AddRoomPage;