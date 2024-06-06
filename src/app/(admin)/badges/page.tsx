
import { getBadges } from '@/lib/api/badge';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import BadgePageContent from '@/components/PageComponents/BadgePage';

import { Pagination } from '@/types/network';


const BadgesPage = async ( { searchParams }: { searchParams: Pagination; } ) => {
  const badges = await getBadges( { pagination: searchParams } );
  console.log( badges );
  return (
    <>
      <Header title='Badges' subtitle={ [ {
        label: 'All badges Information',
        link: '/badge'
      } ] } />
      <PageContainer>
        <BadgePageContent data={ badges.data } pagination={ badges.pagination } />
      </PageContainer>
    </>
  );
};

export default BadgesPage;