import { getBanners } from '@/lib/api/banner';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import BannerPageContent from '@/components/PageComponents/BannerPage';

import { Pagination } from '@/types/network';


const BannerPage = async ({ searchParams }: { searchParams: Pagination; }) => {
  const isFilterByAllStatus = searchParams.status === 'all'
  const pagination: Pagination = { status: 'publish', ...searchParams }

  if (isFilterByAllStatus) delete pagination.status

  const banners = await getBanners({ pagination })

  return (
    <>
      <Header title='Banner' subtitle={[{
        label: 'All banner Information',
        link: '/banner'
      }]} />
      <PageContainer>
        <BannerPageContent data={banners.data} pagination={banners.pagination} />
      </PageContainer>
    </>
  );
};

export default BannerPage;