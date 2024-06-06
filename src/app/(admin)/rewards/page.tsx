import { getRewards } from '@/lib/api/reward';
import { getTiers } from '@/lib/api/tier';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import RewardTable from '@/components/PageComponents/RewardPage/RewardTable';

import { Pagination } from '@/types/network';


const Rewards = async ( { searchParams }: { searchParams: Pagination; } ) => {

  const rewards = await getRewards( { pagination: searchParams, } );
  // should we add lazy load to this? or should we just load all the tiers?
  const tiers = await getTiers( { limit: 99999 } );
  return (
    <>
      <Header title='Voucher Rewards' subtitle={ [ {
        label: 'All Rewards Information',
        link: '/badge'
      } ] } />
      <PageContainer>
        <RewardTable tiers={ tiers.data } data={ rewards.data } pagination={ rewards.pagination } />
      </PageContainer>
    </>
  );
};

export default Rewards;