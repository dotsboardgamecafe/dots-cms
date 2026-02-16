'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { adjustUserVp } from '@/lib/api/member';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import InputNumber from '@/components/ui/Input/Number';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AdjustUserVpPayload, AdjustUserVpSchema, MemberType } from '@/types/member';
import Textarea from '@/components/ui/Input/TextArea';

type Props = {
  onClose: () => void;
  member_code: MemberType['user_code']
};

export const AdjustUserVpForm = ({ onClose, member_code }: Props) => {
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const form = useForm<AdjustUserVpPayload>(({
    defaultValues: {
      adjustment_type: 'subtract',
      point: 0,
      description: null,
    },
    resolver: zodResolver(AdjustUserVpSchema)
  }));

  const onSubmit = async (payload: AdjustUserVpPayload) => {
    setIsSubmitting(true)
    try {
      const res = await adjustUserVp(member_code, payload)
      if (res.stat_code?.includes('ERR')) throw new Error("ERR: Failed to adjust vp")
      toast({
        title: `Successfully adjusted the VP`,
        variant: 'default',
      });
      onClose()
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `Failed to adjust the VP`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        <FormField
          control={form.control}
          name="point"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  VP Point
                </Typography>
              </FormLabel>
              <FormControl>
                <InputNumber placeholder='Enter VP Point' value={field.value} onChange={(event) => field.onChange({ ...event, target: { ...event.target, value: Number(event.target.value || 0) } })} maxLength={100} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='adjustment_type'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mb-4 block' htmlFor='status'>
                <Typography variant='text-body-xl-heavy'>
                  Type of Adjustment
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className='flex flex-row gap-8'>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="subtract" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Deduct
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="add" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Add
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
          name="description"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Description
                </Typography>
              </FormLabel>
              <FormControl>
                <Textarea placeholder='Enter Some Description' style={{ resize: 'none', height: '100px' }} value={field.value?.toString()} onChange={(event) => event.target.value.length > 150 ? null : field.onChange({ ...event, target: { ...event.target, value: event.target.value || null } })} maxLength={150} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={(evt) => { evt.preventDefault(); onClose(); }}>Cancel</Button>
          <Button disabled={isSubmitting} variant="default" size='lg' type='submit' className='flex-1'>Save</Button>
        </section>
      </form>
    </Form >
  );
};


