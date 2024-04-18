import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const GameCatalogLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Game Catalog' subtitle='All Game Information' />
      { children }
    </>
  );
};

export default GameCatalogLayout;