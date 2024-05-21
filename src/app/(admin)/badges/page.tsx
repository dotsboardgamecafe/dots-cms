import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';


const BadgesPage = () => {

  return (
    <>
      <Header title='Badges' subtitle={ [ {
        label: 'All badges Information',
        link: '/badge'
      } ] } />
      <PageContainer>
        Forbidden
      </PageContainer>
    </>
  );
};

export default BadgesPage;