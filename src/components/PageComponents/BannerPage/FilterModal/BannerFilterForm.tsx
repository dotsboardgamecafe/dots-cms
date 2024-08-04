'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import Typography from '@/components/ui/Typography';

import { CafeFilter, CafeFilterSchema } from '@/types/cafes';

export type CafeFilterControl = {
  resetFilter: () => void
}

type Props = {
  onClose: () => void;
  control?: MutableRefObject<null | CafeFilterControl>
};

export const BannerFilterForm = ({ onClose, control }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const form = useForm<CafeFilter>(({
    defaultValues: {
      status: searchParams.get('status') || 'publish',
    },
    resolver: zodResolver(CafeFilterSchema)
  }));

  const handleFormSubmit = (data: CafeFilter) => {
    const params = new URLSearchParams(searchParams);

    if (data.status) params.set('status', data.status)
    else params.delete('status')

    router.replace(pathName + '?' + params.toString())
    onClose()
  };

  const resetFilter = useCallback(() => {
    form.setValue('status', 'publish')
  }, [form])

  useEffect(() => {
    if (!control?.current && control?.current !== null) return
    control.current = { resetFilter }
  }, [control, resetFilter])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-6'>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='text-body-xl-heavy'>
                  Status
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-row "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        All Status
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="publish" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Published
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="unpublish" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Unpublished
                      </Typography>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={(evt) => { evt.preventDefault(); onClose(); }}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' className='flex-1' >Apply</Button>
        </section>
      </form>
    </Form >
  );
};

export default BannerFilterForm;