
import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddTournamentForm from '@/components/PageComponents/TournamentPage/AddTournament/form';

const AddTournamentPage = async () => {

  return (
    <>
      <Header
        title='Tournament'
        subtitle={[
          { label: 'All Tournament Information', link: '/tournament' },
          { label: 'Add New Tournament', link: '#' },
        ]}
      />
      <PageContainer>
        <AddTournamentForm />
      </PageContainer>
    </>
  );
};

export default AddTournamentPage;