import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddGameForm from '@/components/PageComponents/GamePage/GameAddForm';

const AddGamePage = async () => {
  const admins = await getAdmins({ pagination: { limit: 9999999, status: 'active' } });
  const cafes = await getCafes({ pagination: { limit: 9999999, status: 'active' } });

  return (
    <div>
      <Header
        title='Game Catalog'
        subtitle={[
          { label: 'All Game Information', link: '/game' },
          { label: 'Add New Game', link: '#' },
        ]}
      />
      <PageContainer>
        <AddGameForm admins={admins.data} cafes={cafes.data} />
      </PageContainer>
    </div>
  );

};

export default AddGamePage;