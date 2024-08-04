
import { getMechanics } from '@/lib/api/mechanic';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import MechanicTable from '@/components/PageComponents/GameMechanicsPage/MechanicsTable';

import { Pagination } from '@/types/network';


const GamePage = async ({ searchParams }: { searchParams: Pagination; }) => {
  const mechanics = await getMechanics({ pagination: { limit: 999999 } });

  return (
    <>
      <Header title='Game Catalog' subtitle={[{
        label: 'All Game Mechanic Information',
        link: '/mechanic'
      }]} />
      <PageContainer>
        <MechanicTable data={mechanics.data} pagination={mechanics.pagination} />
      </PageContainer>
    </>
  );
};

export default GamePage;