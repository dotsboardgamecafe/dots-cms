import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';


const Rewards = () => {

  return (
    <>
      <Header title='Rewards' subtitle={ [ {
        label: 'All Rewards Information',
        link: '/badge'
      } ] } />
      <PageContainer>
        Forbidden
      </PageContainer>
    </>
  );
};

export default Rewards;