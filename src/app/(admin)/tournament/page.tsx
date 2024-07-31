'use server';



import { getTournaments } from '@/lib/api/tournament';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import TournamentTable from '@/components/PageComponents/TournamentPage/DataTable';

import { PageProps } from '@/types/common';
import { Pagination } from '@/types/network';

const RoomPage = async ({ searchParams }: PageProps) => {
  const isFilterAll: boolean = searchParams.status === 'all'
  const pagination: Pagination = { order: 'tournaments.status,tournaments.created_date', sort: 'ASC,DESC', status: 'active', ...searchParams }
  if (isFilterAll) delete pagination.status

  const tournaments = await getTournaments({ pagination: pagination });
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