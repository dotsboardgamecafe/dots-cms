
import { getBadges } from '@/lib/api/badge';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import BadgePageContent from '@/components/PageComponents/BadgePage';

import { Pagination } from '@/types/network';


const BadgesPage = async ({ searchParams }: { searchParams: Pagination; }) => {
  const isFilterAllStatus = searchParams.status === 'all'
  const pagination: Pagination = { status: 'active', ...searchParams }

  if (isFilterAllStatus) delete pagination.status

  const badges = await getBadges({ pagination });

  return (
    <>
      <Header title='Badges' subtitle={[{
        label: 'All badges Information',
        link: '/badge'
      }]} />
      <PageContainer>
        <BadgePageContent data={badges.data} pagination={badges.pagination} />
      </PageContainer>
    </>
  );
};

export default BadgesPage;