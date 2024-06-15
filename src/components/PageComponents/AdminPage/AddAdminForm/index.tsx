'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createAdmin } from '@/lib/api/admin';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Password from '@/components/ui/Input/Password';
import PhoneNumber from '@/components/ui/Input/PhoneNumber';
import Text from '@/components/ui/Input/Text';
import Upload from '@/components/ui/Input/Upload';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AddAdminSchema } from '@/types/admin';

type Props = {
  onClose: () => void;
};

export const AddAdminForm = ({ onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof AddAdminSchema>>(({
    defaultValues: {
      image_url: '',
      email: '',
      name: '',
      phone_number: '',
      password: '',
      status: 'active'
    },
    resolver: zodResolver(AddAdminSchema)
  }));

  const onSubmit = async (data: z.infer<typeof AddAdminSchema>) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const res = await createAdmin(data)
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: 'Admin successfully added!',
        variant: 'default',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'failed to add an admin',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <FormField
          name='image_url'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mb-2 block' htmlFor='status'>
                <Typography variant='paragraph-l-medium'>
                  Upload Photo
                </Typography>
              </FormLabel>
              <FormControl>
                <Upload value={field.value} onChange={field.onChange} variant='small' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Admin Name
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Admin Name' value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Email Address
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Email Address' value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Password
                </Typography>
              </FormLabel>
              <FormControl>
                <Password placeholder='Enter password' toggler value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Phone Number (Optional)
                </Typography>
              </FormLabel>
              <FormControl>
                <PhoneNumber value={field.value} onChange={({ value, phoneCode }) => field.onChange(`${phoneCode} ${value}`)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' disabled={isSubmitting} onClick={(evt) => { evt.preventDefault(); onClose(); }}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' disabled={isSubmitting} loading={isSubmitting} className='flex-1'>Add</Button>
        </section>
      </form>
    </Form >
  );
};


