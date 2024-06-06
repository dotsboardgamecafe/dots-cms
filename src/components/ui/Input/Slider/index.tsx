import * as Slider from '@radix-ui/react-slider';
import React, { forwardRef } from 'react';

import Typography from '@/components/ui/Typography';

const SliderRange: React.ForwardRefExoticComponent<Slider.SliderProps & React.RefAttributes<HTMLSpanElement> & { prefix?: string }> = forwardRef(({ prefix, min, max, step, ...props }, ref) => (
  <div className='w-full flex flex-row flex-nowrap gap-2 items-center'>
    <Slider.Root ref={ref} className="relative flex items-center select-none touch-none flex-grow h-6" defaultValue={[0]} max={max} step={step} {...props}>
      <Slider.Track className="bg-slate-300 relative flex-grow rounded-full h-1">
        <Slider.Range className="absolute h-full bg-brand-blue-electric rounded-full" />
        <Typography variant='paragraph-l-regular' className='absolute left-1 top-3'>min-{min}</Typography>
        <Typography variant='paragraph-l-regular' className='absolute right-1 top-3'>max-{max}</Typography>
      </Slider.Track>
      <Slider.Thumb className="block w-4 h-4 bg-brand-blue-electric rounded-full hover:bg-opacity-75 focus:bg-opacity-75 outline-none" aria-label="Volume" />
    </Slider.Root>
    <Typography variant='paragraph-xl-regular' className='min-w-16'>
      {prefix} {props.value || 0}
    </Typography>
  </div>
));

export default SliderRange;