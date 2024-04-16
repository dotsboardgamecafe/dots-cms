import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const MemberPage = ( { children }: Props ) => {

  return (
    <>MemberPage Component</>
  );
};

export default MemberPage;