'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Checkbox from '@/components/ui/Input/Checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import Typography from '@/components/ui/Typography';

import { Pagination } from '@/types/network';
import { GameCategoryType } from '@/types/settings';

export type BadgeFilterControlType = {
  resetFilter: () => void
}

type Props = {
  onClose: () => void;
  control?: MutableRefObject<null | BadgeFilterControlType>
  gameTypes: GameCategoryType[]
};

export type GameFilterType = Omit<Pagination, 'sort'> & {
  game_type: string[]
  sort: Pagination['sort'] | null
  duration: {
    min: string | null,
    max: string | null
  }
}

export const GameFilterForm = ({ onClose, control, gameTypes }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const form = useForm<GameFilterType>(({
    defaultValues: {
      game_type: searchParams.get('game_type')?.split(',') || [],
      sort: searchParams.get('sort') as Pagination['sort'] || null,
      order: searchParams.get('order') || '',
      duration: {
        min: searchParams.get('min_duration'),
        max: searchParams.get('max_duration')
      },
      status: searchParams.get('status') || 'active'
    },
  }));

  const handleFormSubmit = (data: GameFilterType) => {
    const params = new URLSearchParams(searchParams)
    params.delete('status')
    params.delete('game_type')
    params.delete('sort')
    params.delete('order')
    params.delete('min_duration')
    params.delete('max_duration')

    if (data.status) params.set('status', data.status)
    if (data.game_type.length > 0) params.set('game_type', data.game_type.join(','))
    if (data.sort) {
      params.set('sort', data.sort)
      params.set('order', 'games.name')
    }
    if (data.duration.min) params.set('min_duration', data.duration.min)
    if (data.duration.max) params.set('max_duration', data.duration.max)

    router.replace(pathName + '?' + params.toString())
    onClose()
  };

  const resetFilter = useCallback(() => {
    form.setValue('status', 'active')
    form.setValue('game_type', [])
    form.setValue('sort', null)
    form.setValue('duration', { min: null, max: null })
  }, [form])

  useEffect(() => {
    if (!control?.current && control?.current !== null) return
    control.current = { resetFilter }
  }, [control, resetFilter])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-6'>
        <FormField
          control={form.control}
          name="game_type"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='text-body-xl-heavy'>
                  Game Type
                </Typography>
              </FormLabel>
              <FormControl>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  {gameTypes.map((type) => (
                    <Checkbox key={type.setting_code} checked={field.value.includes(type.content_value)} id={type.set_key} label={type.content_value} onChange={(event) => {
                      const isChecked = event.target.checked
                      if (isChecked) return field.onChange([...field.value, type.content_value])

                      field.onChange(field.value.filter((gameTypeCheckboxValue) => gameTypeCheckboxValue !== type.content_value))
                    }} />
                  ))}
                </FormItem>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='text-body-xl-heavy'>
                  Duration
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    const [minDuration, maxDuration] = value.split('-')
                    field.onChange({
                      min: minDuration || null,
                      max: maxDuration || null
                    })
                  }}
                  value={(field.value.max !== null || field.value.min !== null) ? `${field.value.min || 0}${field.value.max ? `-${field.value.max}` : ''}` : ''}
                  className="flex flex-row "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        All Duration
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0-30" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        {'<30 min'}
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="31-60" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        30-60 min
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="61-120" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        60-120 min
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="121" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        {'>120 min'}
                      </Typography>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='text-body-xl-heavy'>
                  Status
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-row "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        All Status
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Active
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
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
          )}
        />
        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem >
              <FormLabel className='mb-2 block'>
                <Typography variant='text-body-xl-heavy'>
                  View By
                </Typography>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  className="flex flex-row "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Created Date
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ASC" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Ascending
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="DESC" />
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
          )}
        />
        <section className='flex gap-6'>
          <Button variant="secondary" size='lg' className='flex-1' onClick={(evt) => { evt.preventDefault(); onClose(); }}>Cancel</Button>
          <Button variant="default" size='lg' type='submit' className='flex-1' >Apply</Button>
        </section>
      </form>
    </Form >
  );
};

export default GameFilterForm;