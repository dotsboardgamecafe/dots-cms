import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const TierLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Tier' subtitle='All tier Information' />
      { children }
    </>
  );
};

export default TierLayout;