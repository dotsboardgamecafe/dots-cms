import { Eye, EyeSlash } from 'iconsax-react';
import React, { PropsWithChildren, PropsWithRef, useState } from 'react';

import { cn } from '@/lib/utils';

import InputWrapper from '@/components/ui/Input/InputWrapper';
import Typography from '@/components/ui/Typography';

import { InputProps } from '@/types/Inputs';

type Props = PropsWithRef<PropsWithChildren<{
  toggler?: boolean;
} & InputProps & React.InputHTMLAttributes<HTMLInputElement>>>;

const Password = ( { prefixIcon, suffixIcon, toggler, label, ...props }: Props ) => {
  const [ showPassword, setShowPassword ] = useState( false );
  const type = showPassword ? 'text' : 'password';

  const togglePassword = () => {
    setShowPassword( !showPassword );
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      {
        label &&
        <Typography variant='paragraph-l-medium' color='neutral-ink'>
          { label }
        </Typography>
      }
      <InputWrapper prefixIcon={ prefixIcon } >
        <input type={ type } className={
          cn( [
            'w-full',
            props.className
          ] )
        } { ...props } />
        {
          toggler &&
          <div className='pr-[14px] cursor-pointer' onClick={ togglePassword }>
            {
              showPassword
                ? <Eye variant='Bold' />
                : <EyeSlash variant='Bold' />
            }
          </div>
        }
      </InputWrapper>
    </div>
  );
};

export default Password;