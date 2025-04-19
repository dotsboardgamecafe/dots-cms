'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Text from '@/components/ui/Input/Text';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { MemberType, UpdateUserCustomizationSchema, UserCustomization } from '@/types/member';
import { ResponseType } from '@/types/network';

type Props = {
  onClose: () => void;
  onSubmit: (data: UserCustomization) => Promise<ResponseType<unknown>>;
  defaultData: MemberType;
};

export const UserCustomizationForm = ({ onClose, defaultData, onSubmit }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<UserCustomization>(({
    defaultValues: {
      color: defaultData.user_style.color?.replace('#', '') || '000000'
    },
    resolver: zodResolver(UpdateUserCustomizationSchema)
  }));

  const handleFormSubmit = async (data: UserCustomization) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      color: `#${data.color}`
    }

    try {
      const res = await onSubmit(payload)
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      onClose();
      toast({
        title: `Successfully customize user ${defaultData.username}`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `Failed to customize user ${defaultData.username}`,
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  const handlePasteHexCode = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    let paste = (event.clipboardData || window.Clipboard).getData("text");
    paste = paste.replace('#', '').toUpperCase();
    form.setValue('color', paste)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-6 flex-grow overflow-y-auto'>
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Username Display Color
                </Typography>
              </FormLabel>
              <FormControl>
                <div className='flex gap-1'>
                  <Text placeholder='Enter hex code' value={field.value} onChange={field.onChange} maxLength={6} prefixIcon='#' onPaste={handlePasteHexCode} suffixIcon={<input type='color' value={`#${field.value}`} onChange={(event) => form.setValue('color', event.target.value.replace('#', '').toUpperCase())} />} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={(evt) => { evt.preventDefault(); onClose(); }} disabled={isSubmitting}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' className='flex-1' disabled={isSubmitting} loading={isSubmitting}>Save Changes</Button>
        </section>
      </form>
    </Form >
  );
};

export default UserCustomizationForm;