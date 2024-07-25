import React from 'react';

import { cn } from '@/lib/utils';

import Typography from '@/components/ui/Typography';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  note?: string;
}


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ note, className, ...props }, ref) => {

  return (
    <section className='textarea-wrapper'>
      <textarea ref={ref} className={
        cn('input-textarea', className)
      } {...props}></textarea>
      {
        note && <Typography variant='text-body-m-regular' className='text-gray-500'>{note}</Typography>
      }
    </section>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;