import { getGameList } from '@/lib/api/games';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import GameTable from '@/components/PageComponents/GamePage/GameTable';


const GamePage = async () => {

  const games = await getGameList();
  return (
    <>
      <Header title='Game Catalog' subtitle={ [ {
        label: 'All Game Information',
        link: '/game'
      } ] } />
      <PageContainer>
        <GameTable data={ games.data } pagination={ games.pagination } />
      </PageContainer>
    </>
  );
};

export default GamePage;