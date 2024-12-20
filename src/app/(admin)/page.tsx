'use server';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';

const DashboardPage = async () => {
  return (
    <>
      <Header title='' />
      <PageContainer>
        Oops... You don't have any permissions setup.
        Please contact your administration
      </PageContainer>
    </>

  );
};

export default DashboardPage;