import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const RewardsLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Rewards' subtitle='All rewards Information' />
      { children }
    </>
  );
};

export default RewardsLayout;