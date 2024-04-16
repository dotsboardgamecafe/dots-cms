import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const TierPage = ( { children }: Props ) => {

  return (
    <>TierPage Component</>
  );
};

export default TierPage;