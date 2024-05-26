import { getCafes } from '@/lib/api/cafes';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import CafeTable from '@/components/PageComponents/CafePage/DataTable';

import { PageProps } from '@/types/common';

const CafePage = async ( { searchParams }: PageProps ) => {
  const cafes = await getCafes( { query: searchParams } );
  return (
    <>
      <Header title='Cafes' subtitle={ [ {
        label: 'All cafe Information',
        link: '/cafe'
      } ] } />
      <PageContainer>
        <CafeTable data={ cafes.data } pagination={ cafes.pagination } />
      </PageContainer>
    </>
  );
};

export default CafePage;