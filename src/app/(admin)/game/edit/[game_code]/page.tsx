
import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';
import { getGameDetail } from '@/lib/api/games';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import EditGameForm from '@/components/PageComponents/GamePage/GameEditForm';

const ViewRoomPage = async ({ params: { game_code } }: { params: { game_code: string; }; }) => {
  const gameDetail = await getGameDetail(game_code);
  const admins = await getAdmins({ pagination: { limit: 999999, status: 'active' } });
  const cafes = await getCafes({ pagination: { limit: 999999, status: 'active' } });

  return (
    <>
      <Header
        title='Game Catalog'
        subtitle={[
          { label: 'All Game Information', link: '/game' },
          { label: `Edit game ${gameDetail.data.name}`, link: '#' },
        ]}
      />
      <PageContainer>
        <EditGameForm admins={admins.data} defaultValue={gameDetail.data} cafes={cafes.data} />
      </PageContainer>
    </>
  );
};

export default ViewRoomPage;