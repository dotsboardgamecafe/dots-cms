import { PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';

import { InputExtras } from '@/types/Inputs';

type Props = PropsWithRef<PropsWithChildren<InputExtras>>;

const InputWrapper = ( { children }: Props ) => {

  return (
    <div className={ cn( [
      'input-wrapper border-gray-300 rounded-lg border-[1px] w-full typography--variant-paragraph-l-regular flex items-center',
    ] ) }>
      { children }
    </div>
  );
};

export default InputWrapper;