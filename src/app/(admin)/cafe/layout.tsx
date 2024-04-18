import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const CafeLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Cafe Management' subtitle='All Cafe Information' />
      { children }
    </>
  );
};

export default CafeLayout;