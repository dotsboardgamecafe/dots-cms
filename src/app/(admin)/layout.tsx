import { PropsWithChildren, PropsWithRef } from 'react';

import Sidebar from '@/components/LayoutComponents/Sidebar';

type Props = PropsWithRef<PropsWithChildren>;

const Layout = ( { children }: Props ) => {

  return (
    <>
      <div className='p-6 flex gap-8'>
        <Sidebar />
        { children }
      </div>
    </>
  );
};

export default Layout;