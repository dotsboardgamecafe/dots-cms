import React from 'react';

import { cn } from '@/lib/utils';

import InputWrapper from '@/components/ui/Input/InputWrapper';
import Typography from '@/components/ui/Typography';

import { InputProps } from '@/types/Inputs';

type Props = React.InputHTMLAttributes<HTMLInputElement> & InputProps;

const Number = React.forwardRef<HTMLInputElement, Props>( ( { prefixIcon, suffixIcon, label, className, ...props }, ref ) => {



  return (
    <div className='w-full flex flex-col gap-2'>
      {
        label &&
        <Typography variant='paragraph-l-medium' color='neutral-ink'>
          { label }
        </Typography>
      }
      <InputWrapper className={ className } >
        { prefixIcon }
        <input
          { ...props }
          type='text'
          onKeyDown={ ( evt ) => {
            const whitelistedKeys = [ 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight' ];
            if ( !/[0-9]/.test( evt.key ) && !whitelistedKeys.includes( evt.key ) ) {
              evt.preventDefault();
            }
          } }
          className={
            cn( [
              'w-full',
            ] )
          }
          onChange={ props.onChange }
          value={ props.value }
          ref={ ref } />
        { suffixIcon }
      </InputWrapper>
    </div>
  );
} );

export default Number;