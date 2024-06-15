import * as SwitchRadix from '@radix-ui/react-switch';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { cn } from '@/lib/utils';

const Switch: ForwardRefExoticComponent<SwitchRadix.SwitchProps & RefAttributes<HTMLButtonElement> & { label?: ReactNode }> = forwardRef(({ className, label, ...props }, ref) => {
  return (
    <div className='flex flex-row flex-nowrap justify-between items-center'>
      {label}
      <SwitchRadix.Root ref={ref} {...props} className={cn("w-11 h-7 bg-neutral-600 rounded-full relative data-[state=checked]:bg-neutral-200", className)}>
        <SwitchRadix.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-1 will-change-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-brand-blue-electric" />
      </SwitchRadix.Root>
    </div>
  )
});

export default Switch