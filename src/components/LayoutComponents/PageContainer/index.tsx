import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const PageContainer = ( { children }: Props ) => {

  return (
    <>
      <section className='page-container mt-4'>
        { children }
      </section>
    </>
  );
};

export default PageContainer;