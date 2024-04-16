import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const AdminPage = ( { children }: Props ) => {

  return (
    <>AdminPage Component</>
  );
};

export default AdminPage;