'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { updateAdmin } from '@/lib/api/admin';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Password from '@/components/ui/Input/Password';
import PhoneNumber from '@/components/ui/Input/PhoneNumber';
import Text from '@/components/ui/Input/Text';
import Upload from '@/components/ui/Input/Upload';
import { Separator } from '@/components/ui/Separator';
import Switch from '@/components/ui/Switch';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AdminType, EditAdminSchema } from '@/types/admin';

type Props = {
  onClose: () => void;
  adminData: AdminType
};

export const EditAdminForm = ({ onClose, adminData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSetPassword, setIsSetPassword] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof EditAdminSchema>>(({
    defaultValues: {
      image_url: adminData.image_url,
      email: adminData.email,
      name: adminData.name,
      phone_number: adminData.phone_number || '',
      status: adminData.status as z.infer<typeof EditAdminSchema>['status'],
      username: adminData.user_name || ''
    },
    resolver: zodResolver(EditAdminSchema)
  }));

  const onSubmit = async (data: z.infer<typeof EditAdminSchema>) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const { password, ...restData } = data
    const payload: z.infer<typeof EditAdminSchema> = {
      ...restData,
    }

    if (isSetPassword) payload.password = password

    try {
      const res = await updateAdmin(adminData.admin_code, payload)
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: 'Admin successfully updated!',
        variant: 'default',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'failed to update the admin',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 flex-grow overflow-y-auto'>
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
          name="username"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Username
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter username for the admin' value={field.value} onChange={field.onChange} />
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
          name="phone_number"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Phone Number (Optional)
                </Typography>
              </FormLabel>
              <FormControl>
                <PhoneNumber value={field.value} onChange={({ value, phoneCode }) => field.onChange(`${phoneCode ? `${phoneCode} ` : ''}${value}`)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <section>
          <Switch
            onCheckedChange={(checked) => {
              setIsSetPassword(checked)
              if (!checked) form.setValue('password', undefined)
              else form.setValue('password', '')
            }}
            label={<Typography variant='paragraph-xl-bold'>Change password</Typography>}
          />
        </section>
        {
          isSetPassword && (
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
                    <Password placeholder='Enter password' value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        }
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' disabled={isSubmitting} onClick={(evt) => { evt.preventDefault(); onClose(); }}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' disabled={isSubmitting} loading={isSubmitting} className='flex-1'>Update</Button>
        </section>
      </form>
    </Form >
  );
};


