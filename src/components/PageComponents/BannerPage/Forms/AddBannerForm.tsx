'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AddBannerSchema, TBannerData, TPostBannerPayload } from '@/types/banner';
import { ResponseType } from '@/types/network';

type Props = {
  onClose: () => void;
  onSubmit: ( data: TPostBannerPayload ) => Promise<ResponseType<any>>;
  defaultData?: TBannerData;
};

export const AddBannerForm = ( { onClose, defaultData, onSubmit }: Props ) => {
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TPostBannerPayload>( ( {
    defaultValues: {
      status: 'unpublish',
      ...defaultData
    },
    resolver: zodResolver( AddBannerSchema )
  } ) );

  const handleFormSubmit = ( data: TPostBannerPayload ) => {
    setIsSubmitting( true );
    onSubmit( data )
      .then( () => {
        // router.refresh()
        onClose();
        toast( {
          title: `Banner successfully ${defaultData ? 'updated!' : 'added!'}`,
          variant: 'default',
        } );
      } )
      .catch( ( err: any ) => {
        console.log( err );
        toast( {
          title: 'Something went wrong',
          description: `failed to ${defaultData ? 'update' : 'add'} the banned`,
          variant: 'destructive',
        } );
      } )
      .finally( () => setIsSubmitting( false ) );
  };

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( handleFormSubmit ) } className='flex flex-col gap-6'>
        <FormField
          control={ form.control }
          name="title"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Banner Title
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Banner Title' value={ field.value } onChange={ field.onChange } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="banner_type"
          render={ ( { field } ) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <Typography variant='paragraph-l-medium'>
                  Category
                </Typography>
              </FormLabel>
              <FormControl>
                <Select value={ field.value } onValueChange={ field.onChange }>
                  <SelectTrigger>
                    <SelectValue aria-label={ field.value } placeholder='Select Banner Category'>
                      <Typography variant='text-body-l-medium' className="capitalize" >
                        { field.value }
                      </Typography>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="room_category">Room Category</SelectItem>
                    <SelectItem value="tournament">Tournament</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="description"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Description
                </Typography>
              </FormLabel>
              <FormControl>
                <Textarea note='Max 100 characters' maxLength={ 100 } placeholder='Enter Banner Description' value={ field.value } onChange={ field.onChange } className='resize-none' />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          name='image_url'
          control={ form.control }
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel className='mb-2 block' htmlFor='status'>
                <Typography variant='paragraph-l-medium'>
                  Upload Photo
                </Typography>
              </FormLabel>
              <FormControl>
                <Upload onChange={ field.onChange } variant='default' />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={ ( evt ) => { evt.preventDefault(); onClose(); } } disabled={ isSubmitting }>Cancel</Button>
          <Button variant="default" size='lg' type='submit' className='flex-1' disabled={ isSubmitting }>{ defaultData ? 'Save Changes' : 'Add' }</Button>
        </section>
      </form>
    </Form >
  );
};

export default AddBannerForm;