import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const BannerLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Banner' subtitle='All banner Information' />
      { children }
    </>
  );
};

export default BannerLayout;