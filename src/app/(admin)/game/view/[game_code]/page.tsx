
import { getGameDetail } from '@/lib/api/games';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import GameDetail from '@/components/PageComponents/GamePage/GameDetail';

const ViewRoomPage = async ({ params: { game_code } }: { params: { game_code: string; }; }) => {
  const gameDetail = await getGameDetail(game_code);

  return (
    <>
      <Header
        title='Game Catalog'
        subtitle={[
          { label: 'All Game Information', link: '/game' },
          { label: `${gameDetail.data.name}`, link: '#' },
        ]}
      />
      <PageContainer>
        <GameDetail gameDetail={gameDetail.data} />
      </PageContainer>
    </>
  );
};

export default ViewRoomPage;