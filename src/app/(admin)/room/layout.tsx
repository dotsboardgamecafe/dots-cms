import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';

type Props = PropsWithRef<PropsWithChildren>;

const RoomLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='Room Play' subtitle='All Room Play Information' />
      <PageContainer>
        { children }
      </PageContainer>
    </>
  );
};

export default RoomLayout;