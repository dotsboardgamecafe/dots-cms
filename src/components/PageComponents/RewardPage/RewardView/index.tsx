import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren<{

}>>;

const RewardView = ( { children }: Props ) => {

  return (
    <>RewardView Component</>
  );
};

export default RewardView;