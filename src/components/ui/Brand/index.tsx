import Image from 'next/image';
import { PropsWithChildren, PropsWithRef } from 'react';

import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren>;

const Brand = ( { children }: Props ) => {

  return (
    <>
      <div className='flex flex-row items-center gap-3 mb-[30px]'>
        <Image src="/images/logo-dots.png" alt="brand" width={ 38 } height={ 38 } />
        <Typography variant='bubble-heading-h2'>
          DOTS
        </Typography>
      </div>
    </>
  );
};

export default Brand;