import { getCafes } from '@/lib/api/cafes';
import { getCity, getProvince } from '@/lib/api/settings';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import CafePageContent from '@/components/PageComponents/CafePage';

import { PageProps } from '@/types/common';

const CafePage = async ({ searchParams }: PageProps) => {
  const cafes = await getCafes({ pagination: searchParams });
  const city = await getCity()
  const province = await getProvince()

  return (
    <>
      <Header title='Cafes' subtitle={[{
        label: 'All cafe Information',
        link: '/cafe'
      }]} />
      <PageContainer>
        <CafePageContent data={cafes.data} pagination={cafes.pagination} settings={{ city: city.data, province: province.data }} />
      </PageContainer>
    </>
  );
};

export default CafePage;