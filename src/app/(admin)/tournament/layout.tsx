import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const TournamentLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Tournament' subtitle='All Tournament Information' />
      { children }
    </>
  );
};

export default TournamentLayout;