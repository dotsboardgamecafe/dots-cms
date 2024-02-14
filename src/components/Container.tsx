import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren<{
  className?: string,
  fetcher: () => Promise<any>;
}>>;

const ContainerTest = ( { children, fetcher }: Props ) => {

  return (
    <>Container Component</>
  );
};


export default ContainerTest;