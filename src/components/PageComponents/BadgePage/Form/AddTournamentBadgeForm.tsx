'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import InputNumber from '@/components/ui/Input/Number';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { TournamentBadgePayloadSchema, TournamentBadgePayloadType, TournamentBadgeSchemaType, TournamentBadgeType } from '@/types/badge';
import { ResponseType } from '@/types/network';

type Props = {
  onClose: () => void;
  onSubmit: (data: TournamentBadgePayloadType) => Promise<ResponseType<any>>;
  defaultData?: { firstPlace: TournamentBadgeType, secondPlace: TournamentBadgeType, thirdPlace: TournamentBadgeType };
};

export const AddTournamentBadgeForm = ({ onClose, defaultData, onSubmit }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();


  const form = useForm<TournamentBadgeSchemaType>(({
    defaultValues: {
      badge_category: 'tournament',
      status: defaultData?.firstPlace.status || 'active',
      image_url1: defaultData?.firstPlace.image_url || '',
      image_url2: defaultData?.secondPlace.image_url || '',
      image_url3: defaultData?.thirdPlace.image_url || '',
      name: defaultData?.firstPlace.name || '',
      vp_point1: defaultData?.firstPlace.vp_point || 0,
      vp_point2: defaultData?.secondPlace.vp_point || 0,
      vp_point3: defaultData?.thirdPlace.vp_point || 0,
      description: defaultData?.firstPlace.description || ''
    },
    resolver: zodResolver(TournamentBadgePayloadSchema)
  }));

  const handleFormSubmit = (data: TournamentBadgeSchemaType) => {
    setIsSubmitting(true);

    const payload: TournamentBadgePayloadType = {
      tournament_badges: [
        {
          ...defaultData?.firstPlace,
          badge_category: data.badge_category,
          name: data.name,
          image_url: data.image_url1,
          status: data.status,
          vp_point: data.vp_point1,
          description: data.description,
          badge_rule: {
            ...defaultData?.firstPlace.badge_rules[0],
            key_condition: 'tournament_winner',
            value_type: 'json',
            value: {
              position: 1
            }
          }
        },
        {
          ...defaultData?.secondPlace,
          badge_category: data.badge_category,
          name: data.name,
          image_url: data.image_url2,
          status: data.status,
          vp_point: data.vp_point2,
          description: data.description,
          badge_rule: {
            ...defaultData?.firstPlace.badge_rules[0],
            key_condition: 'tournament_winner',
            value_type: 'json',
            value: {
              position: 2
            }
          }
        },
        {
          ...defaultData?.thirdPlace,
          badge_category: data.badge_category,
          name: data.name,
          image_url: data.image_url3,
          status: data.status,
          vp_point: data.vp_point3,
          description: data.description,
          badge_rule: {
            ...defaultData?.thirdPlace.badge_rules[0],
            key_condition: 'tournament_winner',
            value_type: 'json',
            value: {
              position: 3
            }
          }
        }
      ]
    }

    onSubmit(payload)
      .then(() => {
        onClose();
        toast({
          title: `Badge successfully ${defaultData ? 'updated!' : 'added!'}`,
          variant: 'default',
        });
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          description: `failed to ${defaultData ? 'update' : 'add'} the badge`,
          variant: 'destructive',
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Form {...form}>
      <div className='flex-grow overflow-auto'>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-6'>
          <section className='grid grid-cols-3 gap-6'>
            <FormField
              control={form.control}
              name="image_url1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='mb-2 block'>
                    <Typography variant='paragraph-l-medium'>
                      Upload Photo for 1st
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Upload id={field.name} value={field.value} onChange={field.onChange} variant='small' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='mb-2 block'>
                    <Typography variant='paragraph-l-medium'>
                      Upload Photo for 2nd
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Upload id={field.name} value={field.value} onChange={field.onChange} variant='small' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='mb-2 block'>
                    <Typography variant='paragraph-l-medium'>
                      Upload Photo for 3rd
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Upload id={field.name} value={field.value} onChange={field.onChange} variant='small' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Badge Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Enter badge name' value={field.value} onChange={field.onChange} maxLength={100} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vp_point1"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      VP Amount 1st
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Enter points' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vp_point2"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      VP Amount 2nd
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Enter points' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vp_point3"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      VP Amount 3rd
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Enter points' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
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
                    <Textarea note='Max 100 characters' maxLength={100} placeholder='Enter Badge Description' value={field.value} onChange={field.onChange} className='resize-none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className='flex gap-6'>
            <Button variant="secondary" size='lg' className='flex-1' onClick={(evt) => { evt.preventDefault(); onClose(); }} disabled={isSubmitting}>Cancel</Button>
            <Button variant="default" size='lg' type='submit' className='flex-1' disabled={isSubmitting}>{defaultData ? 'Save Changes' : 'Add'}</Button>
          </section>
        </form>
      </div>
    </Form >
  );
};

export default AddTournamentBadgeForm;