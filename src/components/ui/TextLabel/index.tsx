import React, { PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';

import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren<{
  title: string,
  value: React.ReactNode;
  className?: string;
}>>;
const TextLabel = ( { title, value, className }: Props ) => {

  return (
    <div className={ cn( [ 'flex flex-col', className ] ) }>
      <Typography variant='paragraph-l-regular' className='text-gray-500'>
        { title }
      </Typography>
      <Typography variant='paragraph-xl-regular'>
        { value }
      </Typography>
    </div>
  );
};

export default TextLabel;