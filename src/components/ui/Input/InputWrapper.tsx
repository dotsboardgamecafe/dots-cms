import { HTMLAttributes, PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';


type Props = PropsWithRef<PropsWithChildren<HTMLAttributes<HTMLDivElement>>>;

const InputWrapper = ( { children, ...props }: Props ) => {

  return (
    <div className={ cn( [
      'input-wrapper typography--variant-paragraph-l-regular ',
      props.className
    ] ) }>
      { children }
    </div>
  );
};

export default InputWrapper;
