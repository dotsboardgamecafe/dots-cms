import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const GamePage = ( { children }: Props ) => {

  return (
    <>GamePage Component</>
  );
};

export default GamePage;