import { getBanners } from '@/lib/api/banner';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import BannerPageContent from '@/components/PageComponents/BannerPage';

import { Pagination } from '@/types/network';


const BannerPage = async ({ searchParams }: { searchParams: Pagination; }) => {
  const banners = await getBanners({ pagination: searchParams })
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