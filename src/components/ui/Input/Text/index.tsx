import React, { PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';

import InputWrapper from '@/components/ui/Input/InputWrapper';
import Typography from '@/components/ui/Typography';

import { InputProps } from '@/types/Inputs';

type Props = PropsWithRef<PropsWithChildren<InputProps & React.InputHTMLAttributes<HTMLInputElement>>>;

const Text = ( { prefixIcon, suffixIcon, label, className, ...props }: Props ) => {
  const inputRef = React.useRef<HTMLInputElement>( null );

  return (
    <div className='w-full flex flex-col gap-2'>
      {
        label &&
        <Typography variant='paragraph-l-medium' color='neutral-ink'>
          { label }
        </Typography>
      }
      <InputWrapper className={ className } onClick={ () => console.log( 'clicked' ) }>
        { prefixIcon }
        <input type='text' className={
          cn( [
            'w-full',
          ] )
        } { ...props } ref={ inputRef } />
        { suffixIcon }
      </InputWrapper>
    </div>
  );
};

export default Text;