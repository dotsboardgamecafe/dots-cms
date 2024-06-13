import { PropsWithChildren, PropsWithRef } from 'react';

import { Providers } from '@/components/Context/ThemeContext';
import Sidebar from '@/components/LayoutComponents/Sidebar';

type Props = PropsWithRef<PropsWithChildren>;

const Layout = ({ children }: Props) => {

  return (
    <>
      <Providers>
        <div className='p-6 flex gap-8 w-full'>
          <Sidebar />
          <section className='flex flex-col w-full gap-8 overflow-hidden'>
            {children}
          </section>
        </div>
      </Providers>

    </>
  );
};

export default Layout;