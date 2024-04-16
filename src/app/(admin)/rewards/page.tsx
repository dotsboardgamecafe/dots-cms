import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const RewardsPage = ( { children }: Props ) => {

  return (
    <>RewardsPage Component</>
  );
};

export default RewardsPage;