import { getGameList } from '@/lib/api/games';

import GameTable from '@/components/PageComponents/GamePage/GameTable';


const GamePage = async () => {

  const games = await getGameList();

  return (
    <>
      <GameTable data={ games.data } pagination={ games.pagination } />
    </>
  );
};

export default GamePage;