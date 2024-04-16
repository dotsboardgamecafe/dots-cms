import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren>;

const BannerPage = ( { children }: Props ) => {

  return (
    <>BannerPage Component</>
  );
};

export default BannerPage;