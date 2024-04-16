import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const RoomPage = ( { children }: Props ) => {

  return (
    <>Room Component</>
  );
};

export default RoomPage;