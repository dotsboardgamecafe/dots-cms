import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const TournamentPage = ( { children }: Props ) => {

  return (
    <>TournamentPage Component</>
  );
};

export default TournamentPage;