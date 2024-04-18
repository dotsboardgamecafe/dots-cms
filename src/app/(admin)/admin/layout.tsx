import { PropsWithChildren, PropsWithRef } from 'react';

import Header from '@/components/LayoutComponents/Header';

type Props = PropsWithRef<PropsWithChildren>;

const AdminLayout = ( { children }: Props ) => {

  return (
    <>
      <Header title='User control' subtitle='All Admin Information' />
      { children }
    </>
  );
};

export default AdminLayout;