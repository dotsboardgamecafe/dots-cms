import { getGameList } from '@/lib/api/games';
import { getGameCategories } from '@/lib/api/settings';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import GameTable from '@/components/PageComponents/GamePage/GameTable';

import { Pagination } from '@/types/network';


const GamePage = async ({ searchParams }: { searchParams: Pagination; }) => {
  const isFilterAll: boolean = searchParams.status === 'all'
  const pagination: Pagination = { status: 'active', ...searchParams }

  if (isFilterAll) delete pagination.status

  const games = await getGameList({ pagination });
  const gameTypeList = await getGameCategories({ pagination: { limit: 99999 } });

  return (
    <>
      <Header title='Game Catalog' subtitle={[{
        label: 'All Game Information',
        link: '/game'
      }]} />
      <PageContainer>
        <GameTable data={games.data} pagination={games.pagination} gameTypes={gameTypeList.data} />
      </PageContainer>
    </>
  );
};

export default GamePage;