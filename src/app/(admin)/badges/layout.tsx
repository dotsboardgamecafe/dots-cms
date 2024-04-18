import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const BadgesLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Badges' subtitle='All badges Information' />
      { children }
    </>
  );
};

export default BadgesLayout;