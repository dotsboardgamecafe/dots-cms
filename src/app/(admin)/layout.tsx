import { PropsWithChildren, PropsWithRef } from 'react';

import Sidebar from '@/components/LayoutComponents/Sidebar';

type Props = PropsWithRef<PropsWithChildren>;

const Layout = ( { children }: Props ) => {

  return (
    <>
      <div className='p-6 flex gap-8 w-full'>
        <Sidebar />
        <section className='flex flex-col w-full gap-8'>
          { children }
        </section>
      </div>
    </>
  );
};

export default Layout;