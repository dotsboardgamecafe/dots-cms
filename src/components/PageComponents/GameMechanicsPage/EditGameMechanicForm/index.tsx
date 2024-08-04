'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { updateMechanics } from '@/lib/api/mechanic';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Text from '@/components/ui/Input/Text';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AddEditGameMechanicSchema, MechanicType } from '@/types/mechanics';

type Props = {
  onClose: () => void;
  mechanicData: MechanicType
};

export const EditGameMechanicForm = ({ onClose, mechanicData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof AddEditGameMechanicSchema>>(({
    defaultValues: {
      name: mechanicData.name,
    },
    resolver: zodResolver(AddEditGameMechanicSchema)
  }));

  const onSubmit = async (data: z.infer<typeof AddEditGameMechanicSchema>) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const res = await updateMechanics(mechanicData.code, data)
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: 'Game mechanic successfully updated!',
        variant: 'default',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'failed to update the game mechanic',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 flex-grow overflow-y-auto'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Game Mechanic Name
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Game Mechanic Name' value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' disabled={isSubmitting} onClick={(evt) => { evt.preventDefault(); onClose(); }}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' disabled={isSubmitting} loading={isSubmitting} className='flex-1'>Update</Button>
        </section>
      </form>
    </Form >
  );
};


