'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AddCafeSchema, CafePayload, CafeType } from '@/types/cafes';
import { ResponseType } from '@/types/network';
import { CityType } from '@/types/settings';

type Props = {
  onClose: () => void;
  onSubmit: (data: CafePayload) => Promise<ResponseType<any>>;
  defaultData?: CafeType;
  settings: {
    city: CityType[],
    province: CityType[],
  }
};

export const AddCafeForm = ({ onClose, defaultData, onSubmit, settings }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<CafePayload>(({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      province: '',
      city: '',
      status: 'inactive',
      ...defaultData
    },
    resolver: zodResolver(AddCafeSchema)
  }));

  const handleFormSubmit = (data: CafePayload) => {
    setIsSubmitting(true);
    onSubmit(data)
      .then(() => {
        onClose();
        toast({
          title: `Cafe successfully ${defaultData ? 'updated!' : 'added!'}`,
          variant: 'default',
        });
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          description: `failed to ${defaultData ? 'update' : 'add'} the cafe`,
          variant: 'destructive',
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-6 flex-grow overflow-y-auto'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Cafe Name
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter new cafe' value={field.value} onChange={field.onChange} maxLength={100} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Address
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter address' value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <Typography variant='paragraph-l-medium'>
                  Province
                </Typography>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue aria-label={field.value} placeholder='Select province'>
                      <Typography variant='text-body-l-medium' className="capitalize" >
                        {field.value}
                      </Typography>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent >
                    {settings.province.map((dataProvince) => (
                      <SelectItem className='capitalize' key={dataProvince.setting_code} value={dataProvince.content_value}>{dataProvince.content_value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <Typography variant='paragraph-l-medium'>
                  City
                </Typography>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue aria-label={field.value} placeholder='Select city'>
                      <Typography variant='text-body-l-medium' className="capitalize" >
                        {field.value}
                      </Typography>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent >
                    {settings.city.map((dataCity) => (
                      <SelectItem className='capitalize' key={dataCity.setting_code} value={dataCity.content_value}>{dataCity.content_value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Textarea note='Max 100 characters' maxLength={100} placeholder='Enter a description...' value={field.value} onChange={field.onChange} className='resize-none' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={(evt) => { evt.preventDefault(); onClose(); }} disabled={isSubmitting}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' className='flex-1' disabled={isSubmitting}>{defaultData ? 'Save Changes' : 'Add'}</Button>
        </section>
      </form>
    </Form >
  );
};

export default AddCafeForm;