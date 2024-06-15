'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import Typography from '@/components/ui/Typography';

import { Pagination } from '@/types/network';

export type FilterControlType = {
  resetFilter: () => void
}

type Props = {
  onClose: () => void;
  control?: MutableRefObject<null | FilterControlType>
};

export const RewardsFilterForm = ({ onClose, control }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const form = useForm<Pagination>(({
    defaultValues: {
      status: searchParams.get('status') || '',
      sort: searchParams.get('sort') as Pagination['sort'],
      order: searchParams.get('order') || ''
    },
  }));

  const handleFormSubmit = (data: Pagination) => {
    const params = new URLSearchParams(searchParams);
    params.delete('status')
    params.delete('sort')
    params.delete('order')

    if (data.status) params.set('status', data.status)
    if (data.sort) {
      params.set('sort', data.sort)
      params.set('order', 'reward_name')
    }

    router.replace(pathName + '?' + params.toString())
    onClose()
  };

  const resetFilter = useCallback(() => {
    form.setValue('status', '')
    form.setValue('sort', undefined)
    form.setValue('order', '')
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
                      <RadioGroupItem value="" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        All Status
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Active
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="inactive" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Inactive
                      </Typography>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='text-body-xl-heavy'>
                  View By
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  className="flex flex-row "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Created Date
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ASC" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Ascending
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="DESC" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Descending
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

export default RewardsFilterForm;