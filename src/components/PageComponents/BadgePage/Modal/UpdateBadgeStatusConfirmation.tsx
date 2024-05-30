'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { editBadges, editTournamentBadge, getBadgeDetail, getTournamentBadgeDetail } from '@/lib/api/badge';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { getDefaultRulesObject } from '@/helper/badge';

import { BadgePostPayloadType, TournamentBadgePayloadType } from '@/types/badge';


type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
  type: 'normal' | 'tournament',
  prevStatus?: 'active' | 'inactive'
}>;

const UpdateBadgeStatusConfirmation = ({ open, onOpenChange, id, type, prevStatus }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  if (!id) return null

  const actionName: string = prevStatus === 'inactive' ? 'active' : 'inactive'

  const onConfirm = () => {
    setIsSubmitting(true)

    let res = null

    if (type === 'normal') res = updateNormalBadge()
    else res = updateTournamentBadge()

    res.
      then(() => {
        toast({
          title: `Badge successfully ${actionName === 'active' ? 'activated' : 'inactivated'}`,
          variant: 'default',
        });
        onOpenChange(false)
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          description: `failed to ${actionName === 'active' ? 'activated' : actionName} the badge`,
          variant: 'destructive',
        });
      })
      .finally(() => setIsSubmitting(false))
  };

  async function updateTournamentBadge() {
    if (!id) return setIsSubmitting(false)

    const { data: badgeDataList } = await getTournamentBadgeDetail(id)

    const badgeDataFirst = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 1)
    const badgeDataSecond = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 2)
    const badgeDataThird = badgeDataList?.find((badge) => badge.badge_rules[0].value.position === 3)

    if (!badgeDataFirst || !badgeDataSecond || !badgeDataThird) return setIsSubmitting(false)

    const payload: TournamentBadgePayloadType = {
      tournament_badges: [
        {
          ...badgeDataFirst,
          badge_category: badgeDataFirst.badge_category,
          name: badgeDataFirst.name,
          image_url: badgeDataFirst.image_url,
          status: actionName,
          vp_point: badgeDataFirst.vp_point,
          badge_rule: {
            ...badgeDataFirst.badge_rules[0],
            key_condition: 'tournament_winner',
            value_type: 'json',
            value: {
              position: 1
            }
          }
        },
        {
          ...badgeDataSecond,
          badge_category: badgeDataSecond.badge_category,
          name: badgeDataSecond.name,
          image_url: badgeDataSecond.image_url,
          status: actionName,
          vp_point: badgeDataSecond.vp_point,
          badge_rule: {
            ...badgeDataSecond.badge_rules[0],
            key_condition: 'tournament_winner',
            value_type: 'json',
            value: {
              position: 2
            }
          }
        },
        {
          ...badgeDataThird,
          badge_category: badgeDataThird.badge_category,
          name: badgeDataThird.name,
          image_url: badgeDataThird.image_url,
          status: actionName,
          vp_point: badgeDataThird.vp_point,
          badge_rule: {
            ...badgeDataThird.badge_rules[0],
            key_condition: 'tournament_winner',
            value_type: 'json',
            value: {
              position: 3
            }
          }
        }
      ]
    }

    return editTournamentBadge({ param: id, body: payload })
  }

  async function updateNormalBadge() {
    if (!id) return setIsSubmitting(true)

    const { data: badgeData } = await getBadgeDetail(id)

    if (!badgeData) return setIsSubmitting(false)

    const defaultBadgeRulesValue: BadgePostPayloadType['badge_rule'] | undefined =
      badgeData.badge_rules.reduce((result: BadgePostPayloadType['badge_rule'], badgeRule) => {
        const populatedValue = getDefaultRulesObject(badgeRule.name)
        if (!populatedValue) return result

        const fieldValue = {
          ...populatedValue,
          value: badgeRule.value
        }

        return [...result, fieldValue]
      }, [])

    const payload = {
      badge_category: badgeData.badge_category,
      badge_rule: defaultBadgeRulesValue || [],
      image_url: badgeData.image_url,
      name: badgeData.name,
      status: actionName,
      vp_point: badgeData.vp_point,
    }

    return editBadges({ param: id, body: payload })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-brand-blue-electric flex items-center justify-center border-[6px]'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to {actionName === 'active' ? 'activate' : actionName} this item?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} disabled={isSubmitting}>Yes, {actionName}</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default UpdateBadgeStatusConfirmation;