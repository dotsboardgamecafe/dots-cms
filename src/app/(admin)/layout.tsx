import { PropsWithChildren, PropsWithRef } from 'react';

import { Providers } from '@/components/Context/ThemeContext';
import Sidebar from '@/components/LayoutComponents/Sidebar';
import { ProcessContextProvider } from '@/components/ui/Modal/processContext';
import { ProcessModal } from '@/components/ui/Modal/ProcessModal';

import { PermissionsProvider } from '@/helper/context/permissionsContext';

type Props = PropsWithRef<PropsWithChildren>;

const Layout = ({ children }: Props) => {

  return (
    <>
      <Providers>
        <ProcessContextProvider>
          <PermissionsProvider>
            <div className='p-6 flex gap-8 w-full'>
              <Sidebar />
              <section className='flex flex-col w-full gap-8 overflow-hidden'>
                {children}
              </section>
            </div>
          </PermissionsProvider>
          <ProcessModal />
        </ProcessContextProvider>
      </Providers>

    </>
  );
};

export default Layout;