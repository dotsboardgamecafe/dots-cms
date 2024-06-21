'use server';



import { getTournaments } from '@/lib/api/tournament';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import TournamentTable from '@/components/PageComponents/TournamentPage/DataTable';

import { PageProps } from '@/types/common';

const RoomPage = async ({ searchParams }: PageProps) => {
  const tournaments = await getTournaments({ pagination: { order: 'tournaments.status,days_past_end_date', sort: 'ASC,ASC', ...searchParams } });
  return (
    <>
      <Header title='Tournament' subtitle={[{
        label: 'All Tournament Information',
        link: '/tournament'
      }]} />
      <PageContainer>
        <TournamentTable data={tournaments.data} pagination={tournaments.pagination} />
      </PageContainer>
    </>

  );
};

export default RoomPage;