import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';


const CafePage = () => {

  return (
    <>
      <Header title='Cafes' subtitle={ [ {
        label: 'All cafe Information',
        link: '/cafe'
      } ] } />
      <PageContainer>
        Forbidden
      </PageContainer>
    </>
  );
};

export default CafePage;