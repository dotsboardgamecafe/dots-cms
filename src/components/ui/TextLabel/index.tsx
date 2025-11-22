import React, { PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';

import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren<{
  title: string,
  value?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode
}>>;
const TextLabel = ({ title, value, className, children, actions }: Props) => {

  return (
    <div className={cn(['flex flex-col', className])}>
      <Typography variant='paragraph-l-regular' className='text-gray-500'>
        {title}
      </Typography>
      {value && (
        <div className={cn(['flex flex-row justify-between items-center'])}>
          <Typography variant='paragraph-xl-regular'>
            {value}
          </Typography>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
};

export default TextLabel;