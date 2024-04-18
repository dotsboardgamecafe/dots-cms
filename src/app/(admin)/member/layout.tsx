import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const MemberLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='User Control' subtitle='All Member Information' />
      { children }
    </>
  );
};

export default MemberLayout;