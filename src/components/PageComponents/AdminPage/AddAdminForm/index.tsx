'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import PhoneNumber from '@/components/ui/Input/PhoneNumber';
import Text from '@/components/ui/Input/Text';
import Upload from '@/components/ui/Input/Upload';
import Typography from '@/components/ui/Typography';

import { AddAdminSchema } from '@/types/admin';

type Props = {
  onClose: () => void;
};

export const AddAdminForm = ( { onClose }: Props ) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof AddAdminSchema>>( ( {
    defaultValues: {
      image: '',
      email: '',
      name: '',
      phone: '',
      status: 'active'
    },
    resolver: zodResolver( AddAdminSchema )
  } ) );

  // useEffect( () => {
  //   form.setValue( 'tierLevel', searchParams.get( 'tierLevel' )?.split( ',' ) || [] );
  //   form.setValue( 'viewBy', searchParams.get( 'viewBy' ) || '' );
  //   form.setValue( 'status', searchParams.get( 'status' ) || '' );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ searchParams ] );

  const onSubmit = ( data: z.infer<typeof AddAdminSchema> ) => {
    // const params = new URLSearchParams();
    // if ( data.status ) {
    //   params.append( 'status', data.status );
    // }
    // if ( data.tierLevel ) {
    //   params.append( 'tierLevel', data.tierLevel.join( ',' ) );
    // }
    // if ( data.viewBy ) {
    //   params.append( 'viewBy', data.viewBy );
    // }
    // router.push( `/member?${params.toString()}` );
    console.log( data );
    onClose();
  };

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className='flex flex-col gap-6'>
        <FormField
          name='image'
          control={ form.control }
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel className='mb-2 block' htmlFor='status'>
                <Typography variant='paragraph-l-medium'>
                  Upload Photo
                </Typography>
              </FormLabel>
              <FormControl>
                <Upload onChange={ field.onChange } variant='small' />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="name"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Admin Name
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Admin Name' value={ field.value } onChange={ field.onChange } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="email"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Email Address
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Email Address' value={ field.value } onChange={ field.onChange } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="phone"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Phone Number (Optional)
                </Typography>
              </FormLabel>
              <FormControl>
                <PhoneNumber />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={ ( evt ) => { evt.preventDefault(); onClose(); } }>Cancel</Button>
          <Button variant="default" size='lg' type='submit' className='flex-1'>Apply</Button>
        </section>
      </form>
    </Form >
  );
};


