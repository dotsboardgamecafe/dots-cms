'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import DatePicker from '@/components/ui/Input/DatePicker';
import Text from '@/components/ui/Input/Text';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { RewardAddSchema } from '@/types/rewards';
import { TierType } from '@/types/tier';


type Props = {
  tiers: TierType[];
  onClose: () => void;
};

export const RewardEditForm = ( { onClose, tiers }: Props ) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof RewardAddSchema>>( ( {
    defaultValues: {
      category_type: '',
      expired_date: '',
      image_url: '',
      name: '',
      status: '',
      tier_code: ''
    },
    resolver: zodResolver( RewardAddSchema )
  } ) );



  const onSubmit = ( data: z.infer<typeof RewardAddSchema> ) => {

    console.log( data );
    onClose();
  };

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className='flex flex-col gap-6'>
        <FormField
          name='name'
          control={ form.control }
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel className='mb-2 block' htmlFor='status'>
                <Typography variant='paragraph-l-medium'>
                  Voucher Reward
                </Typography>
              </FormLabel>
              <FormControl>
                <Text placeholder='Enter Voucher Title' value={ field.value } onChange={ field.onChange } />
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
                  Voucher Category
                </Typography>
              </FormLabel>
              <FormControl>
                <Select value={ field.value } onValueChange={ ( value ) => field.onChange( Boolean( value === 'true' ? true : false ) ) }>
                  <SelectTrigger>
                    <SelectValue aria-label={ field.value } placeholder='Choose yes or no'>
                      <Typography variant='text-body-l-medium' className="capitalize" >
                        { field.value }
                      </Typography>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Food and Beverage'>Food and Beverage</SelectItem>
                    <SelectItem value='Gameplay'>Gameplay</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="tier_code"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Tier
                </Typography>
              </FormLabel>
              <FormControl>
                <Select value={ field.value } onValueChange={ ( value ) => field.onChange( value ) }>
                  <SelectTrigger>
                    <SelectValue aria-label={ field.value } placeholder='Select tier'>
                      <Typography variant='text-body-l-medium' className="capitalize" >
                        { tiers.find( ( tier ) => tier.tier_code === field.value )?.name || '-' }
                      </Typography>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    { tiers.map( ( tier ) => (
                      <SelectItem key={ tier.tier_code } value={ tier.tier_code }>{ tier.name }</SelectItem>
                    ) ) }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="expired_date"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Expired Date
                </Typography>
              </FormLabel>
              <FormControl>
                <DatePicker onChange={ field.onChange } value={ field.value } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="image_url"
          render={ ( { field } ) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='paragraph-l-medium'>
                  Upload Image
                </Typography>
              </FormLabel>
              <FormControl>
                <Upload onChange={ field.onChange } value={ field.value } />
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


