import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const BadgesPage = ( { children }: Props ) => {

  return (
    <>BadgesPage Component</>
  );
};

export default BadgesPage;