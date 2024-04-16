import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const UserPage = ( { children }: Props ) => {

  return (
    <>UserPage Component</>
  );
};

export default UserPage;