'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';

import { giftUserBadge } from '@/lib/api/badge';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { SelectOptionType } from '@/components/ui/Input/SelectMultiple';
import SelectBadgeGift from '@/components/ui/Input/SelectMultiple/SelectBadgeGift';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { BadgeType, GiftBadgePayloadType, GiftBadgeSchema } from '@/types/badge';
import { MemberType } from '@/types/member';

type Props = {
  onClose: () => void;
  member: MemberType
};

export const GiftBadgeFom = ({ onClose, member }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const selectedBadgeRef = useRef<BadgeType | null>(null)

  const { toast } = useToast()
  const form = useForm<GiftBadgePayloadType>(({
    defaultValues: {
      user_code: member.user_code,
      badge_code: ''
    },
    resolver: zodResolver(GiftBadgeSchema)
  }));

  const onSubmit = async (data: GiftBadgePayloadType) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const res = await giftUserBadge(data.user_code, data.badge_code)

      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)
      toast({
        title: `Badge ${selectedBadgeRef.current?.name} successfully added to ${member.username}!`,
        variant: 'default',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'failed to gift the badge',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  function handleBadgeSelected(badgeSelected: SingleValue<SelectOptionType<BadgeType>>) {
    form.setValue('badge_code', badgeSelected?.value || '')
    selectedBadgeRef.current = badgeSelected?.data ?? null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 flex-grow overflow-y-auto'>
        <FormField
          control={form.control}
          name="badge_code"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabel>
                <Typography variant='paragraph-l-medium'>
                  Badge Name
                </Typography>
              </FormLabel>
              <FormControl>
                <SelectBadgeGift
                  onChange={handleBadgeSelected}
                  userId={member.user_code}
                />
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


