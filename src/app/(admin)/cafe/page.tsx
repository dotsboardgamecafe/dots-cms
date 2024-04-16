import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const CafePage = ( { children }: Props ) => {

  return (
    <>CafePage Component</>
  );
};

export default CafePage;