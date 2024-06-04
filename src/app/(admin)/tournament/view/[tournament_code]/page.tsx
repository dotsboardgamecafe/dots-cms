import { getTournamentDetail } from '@/lib/api/tournament';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import TournamentDetail from '@/components/PageComponents/TournamentPage/TournamentDetail';

const ViewRoomPage = async ({ params: { tournament_code } }: { params: { tournament_code: string; }; }) => {
  const tournamentDetail = await getTournamentDetail(tournament_code);

  return (
    <>
      <Header
        title='Tournament'
        subtitle={[
          { label: 'All Room Play Information', link: '/tournament' },
          { label: `View ${tournamentDetail.data.name} tournament`, link: '#' },
        ]}
      />
      <PageContainer>
        <TournamentDetail tournamentDetail={tournamentDetail.data} />
      </PageContainer>
    </>
  );
};

export default ViewRoomPage;