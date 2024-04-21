import Image from 'next/image';

import Typography from '@/components/ui/Typography';

const Brand = () => {

  return (
    <>
      <div className='flex flex-row items-center gap-3 mb-[30px]'>
        <Image src="/images/logo-dots.png" alt="brand" width={ 38 } height={ 38 } style={ { width: 'auto', height: 'auto' } } />
        <Typography variant='bubble-heading-h2'>
          DOTS
        </Typography>
      </div>
    </>
  );
};

export default Brand;