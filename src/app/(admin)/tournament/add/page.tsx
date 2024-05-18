import { getAdmins } from '@/lib/api/admin';
import { getCafes } from '@/lib/api/cafes';
import { getGameList } from '@/lib/api/games';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddTournamentForm from '@/components/PageComponents/TournamentPage/AddTournament/form';

const AddTournamentPage = async () => {
  const games = await getGameList( { limit: 999999 } );
  const admins = await getAdmins( { limit: 999999 } );
  const cafes = await getCafes( { limit: 999999 } );

  return (
    <>
      <Header
        title='Tournament'
        subtitle={ [
          { label: 'All Tournament Information', link: '/tournament' },
          { label: 'Add New Tournament', link: '#' },
        ] }
      />
      <PageContainer>
        <AddTournamentForm games={ games.data } admins={ admins.data } cafes={ cafes.data } />
      </PageContainer>
    </>
  );
};

export default AddTournamentPage;