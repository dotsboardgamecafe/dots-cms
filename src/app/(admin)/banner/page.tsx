import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';


const BannerPage = () => {

  return (
    <>
      <Header title='Banner' subtitle={ [ {
        label: 'All banner Information',
        link: '/banner'
      } ] } />
      <PageContainer>
        Forbidden
      </PageContainer>
    </>
  );
};

export default BannerPage;