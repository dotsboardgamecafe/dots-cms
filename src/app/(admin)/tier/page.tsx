import { getTiers } from '@/lib/api/tier';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import TierTable from '@/components/PageComponents/TierPage/DataTable';

import { PageProps } from '@/types/common';



const TierPage = async ( { searchParams }: PageProps ) => {
  const tiers = await getTiers( { pagination: searchParams.pagination } );
  return (
    <>
      <Header title='Tier' subtitle={ [ {
        label: 'All Tier Information',
        link: '/tier'
      } ] } />
      <PageContainer>
        <TierTable data={ tiers.data } pagination={ tiers.pagination } />
      </PageContainer>
    </>
  );
};

export default TierPage;