'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Checkbox } from '@/components/ui/Checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import Typography from '@/components/ui/Typography';

type Props = {
  onClose: () => void;
};

const schema = z.object( {
  status: z.string().optional(),
  tierLevel: z.array( z.string().optional() ),
  viewBy: z.string().optional(),
} );

const tierLevelItem: { id: string, label: string; }[] = [
  { id: 'legend', label: 'Legend/MVP' },
  { id: 'master', label: 'Master' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'novice', label: 'Novice' },
];
export const AdminFilterForm = ( { onClose }: Props ) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof schema>>( ( {
    defaultValues: {
      status: searchParams.get( 'status' ) || '',
      tierLevel: searchParams.get( 'tierLevel' )?.split( ',' ) || [],
      viewBy: searchParams.get( 'viewBy' ) || ''
    },
    resolver: zodResolver( schema )
  } ) );

  useEffect( () => {
    form.setValue( 'tierLevel', searchParams.get( 'tierLevel' )?.split( ',' ) || [] );
    form.setValue( 'viewBy', searchParams.get( 'viewBy' ) || '' );
    form.setValue( 'status', searchParams.get( 'status' ) || '' );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchParams ] );

  const onSubmit = ( data: z.infer<typeof schema> ) => {
    const params = new URLSearchParams();
    if ( data.status ) {
      params.append( 'status', data.status );
    }
    if ( data.tierLevel ) {
      params.append( 'tierLevel', data.tierLevel.join( ',' ) );
    }
    if ( data.viewBy ) {
      params.append( 'viewBy', data.viewBy );
    }
    router.push( `/member?${params.toString()}` );
    onClose();
  };

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className='flex flex-col gap-8'>
        <FormField
          name='status'
          control={ form.control }
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel className='mb-4 block' htmlFor='status'>
                <Typography variant='text-body-xl-heavy'>
                  Status
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup value={ field.value } onValueChange={ field.onChange } className='flex flex-row gap-8'>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        All
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Active
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
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
          ) }
        />
        <FormField
          control={ form.control }
          name="tierLevel"
          render={ () => (
            <FormItem >
              <FormLabel className='mb-4 block'>
                <Typography variant='text-body-xl-heavy'>
                  Tier Level
                </Typography>
              </FormLabel>
              <div className='grid grid-cols-[auto_1fr] gap-3'>
                { tierLevelItem.map( ( item ) => (
                  <FormField
                    key={ item.id }
                    control={ form.control }
                    name="tierLevel"
                    render={ ( { field } ) => {
                      return (
                        <FormItem
                          key={ item.id }
                          className="flex flex-row items-center gap-2 mr-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={ field.value?.includes( item.id ) }
                              onCheckedChange={ ( checked ) => {
                                return checked
                                  ? field.onChange( [ ...field.value, item.id ] )
                                  : field.onChange(
                                    field.value?.filter(
                                      ( value ) => value !== item.id
                                    )
                                  );
                              } }
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <Typography variant='text-body-l-regular'>
                              { item.label }
                            </Typography>
                          </FormLabel>
                        </FormItem>
                      );
                    } }
                  />
                ) ) }
              </div>

              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          name='viewBy'
          control={ form.control }
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel className='mb-4 block' htmlFor='status'>
                <Typography variant='text-body-xl-heavy'>
                  View By
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup value={ field.value } onValueChange={ field.onChange } className='flex flex-row gap-8'>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="created_date" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Created Date
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="ascending" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Ascending
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="descending" />
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


