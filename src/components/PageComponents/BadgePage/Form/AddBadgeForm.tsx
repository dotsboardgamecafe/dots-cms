'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, PropsWithChildren, useMemo, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ActionMeta, MultiValue, Options, ValueContainerProps } from 'react-select';

import CriteriaInput from '@/components/PageComponents/BadgePage/Card/CriteriaInput';
import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import InputNumber from '@/components/ui/Input/Number';
import SelectMultiple, { SelectOptionCheckBox, SelectOptionType, SelectValueContainer } from '@/components/ui/Input/SelectMultiple';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { badgePostPayloadSchema, BadgePostPayloadType, BadgeRuleNameType, BadgeType } from '@/types/badge';
import { ResponseType } from '@/types/network';

const DisplaySelectedCriteria: React.FC<PropsWithChildren<ValueContainerProps<SelectOptionType, true>>> = memo(
  (props) => {
    const renderValue = (selectedOptions: Options<unknown>) => `Selected ${selectedOptions.length} criteria`
    return <SelectValueContainer renderValue={renderValue} {...props} />
  }
)

type Props = {
  onClose: () => void;
  onSubmit: (data: BadgePostPayloadType) => Promise<ResponseType<any>>;
  defaultData?: BadgeType;
};

export const AddBadgeForm = ({ onClose, defaultData, onSubmit }: Props) => {
  const criteriaOptions: SelectOptionType[] = useMemo(() => ([
    { value: 'time_limit', label: 'Time Limit Rule' },
    { value: 'spesific_board_game_category', label: 'Board Game Rule' },
    { value: 'total_spend', label: 'Spent' }
  ]), [])

  const defaultMultiSelectCriteria: SelectOptionType[] | undefined = useMemo(() => (
    defaultData?.badge_rules.reduce((result: SelectOptionType[], criteria) => {
      const optVal = criteriaOptions.find(option => option.value === criteria.name)
      if (!optVal) return result
      return [...result, optVal]
    }, [])
  ), [defaultData?.badge_rules, criteriaOptions])

  const defaultBadgeRulesValue: BadgePostPayloadType['badge_rule'] | undefined = useMemo(() => {
    return defaultData?.badge_rules.reduce((result: BadgePostPayloadType['badge_rule'], badgeRule) => {
      const populatedValue = getDefaultRulesObject(badgeRule.name)
      if (!populatedValue) return result

      const fieldValue = {
        ...populatedValue,
        value: badgeRule.value
      }

      return [...result, fieldValue]
    }, [])
  }, [defaultData?.badge_rules])

  const formElement = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [criteriaMultiSelectValue, setCriteriaMultiSelectValue] = useState<MultiValue<SelectOptionType>>(defaultMultiSelectCriteria || [])
  const { toast } = useToast();


  const form = useForm<Partial<BadgePostPayloadType>>(({
    defaultValues: {
      badge_category: defaultData?.badge_category || '',
      badge_rule: defaultBadgeRulesValue || [],
      image_url: defaultData?.image_url || '',
      name: defaultData?.name || '',
      status: defaultData?.status || 'inactive',
      vp_point: Number(defaultData?.vp_point || 0),
      description: defaultData?.description || ''
    },
    resolver: zodResolver(badgePostPayloadSchema)
  }));

  const criteriaFields = useFieldArray({
    name: 'badge_rule',
    control: form.control,
  })

  const handleFormSubmit = (data: Partial<BadgePostPayloadType>) => {
    setIsSubmitting(true);
    onSubmit(data as BadgePostPayloadType)
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

  function getDefaultRulesObject(type: BadgeRuleNameType) {
    switch (type) {
      case 'time_limit': return ({
        key_condition: "time_limit",
        value_type: "json",
        value: {
          category: "",
          name: "",
          start_date: "",
          end_date: ""
        }
      })
      case 'spesific_board_game_category': return ({
        key_condition: "spesific_board_game_category",
        value_type: "json",
        value: {
          game_code: [],
          need_gm: true,
          total_played: 0
        }
      })
      case 'total_spend': return ({
        key_condition: "total_spend",
        value_type: "int",
        value: 0
      })

      default: return null
    }
  }

  function handleCriteriaChanges(newValue: MultiValue<SelectOptionType>, event: ActionMeta<SelectOptionType>) {
    setCriteriaMultiSelectValue(newValue)

    if (event.action === 'clear') return form.setValue('badge_rule', [])
    if (event.action === 'deselect-option') {
      const fieldValue = criteriaFields.fields.filter((criteria) => criteria.key_condition !== event.option?.value)

      return form.setValue('badge_rule', fieldValue)
    }

    const criteriaType: string | undefined = event.option?.value

    if (!criteriaType) return

    const defaultData = getDefaultRulesObject(criteriaType as BadgeRuleNameType)

    if (!defaultData) return

    criteriaFields.append(defaultData)
  }

  return (
    <Form {...form}>
      <div className='flex-grow overflow-auto'>
        <form ref={formElement} onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='mb-2 block'>
                  <Typography variant='paragraph-l-medium'>
                    Badge Image
                  </Typography>
                </FormLabel>
                <FormControl>
                  <Upload id={field.name} value={field.value} onChange={field.onChange} variant='small' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              name="badge_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='mb-2 block'>
                    <Typography variant='paragraph-l-medium'>
                      Category Badge
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id={field.name}>
                        <SelectValue aria-label={field.value} placeholder='Select Badge Category'>
                          <Typography variant='text-body-l-medium' className="capitalize" >
                            {field.value}
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="play">Play</SelectItem>
                        <SelectItem value="spent">Spent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vp_point"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      VP Amount
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Enter VP amount' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badge_rule"
              render={({ field }) => (
                <FormItem >
                  <FormLabel disableChildErrorWarning htmlFor={field.name} className='mb-2 block'>
                    <Typography variant='paragraph-l-medium'>
                      Required Criteria
                    </Typography>
                  </FormLabel>
                  <FormControl disableChildErrorWarning>
                    <SelectMultiple
                      id={field.name}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        ValueContainer: DisplaySelectedCriteria,
                        Option: SelectOptionCheckBox
                      }}
                      options={criteriaOptions}
                      value={criteriaMultiSelectValue}
                      onChange={handleCriteriaChanges}
                    />
                  </FormControl>
                  <FormMessage disableChildErrorWarning />
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
          <section className='flex flex-col gap-6'>
            {criteriaFields.fields.map((criteria, index) => (
              <FormField
                key={criteria.id}
                control={form.control}
                name={`badge_rule.${index}.value`}
                render={() => (
                  <CriteriaInput
                    key={criteria.id}
                    parentPath={`badge_rule.${index}.value`}
                    badgeRuleCategory={criteria.key_condition as BadgeRuleNameType}
                    onRemove={() => {
                      const currentValue = [...criteriaMultiSelectValue as unknown[]]
                      const newSelectedRule = currentValue?.splice(index, 1)

                      setCriteriaMultiSelectValue(newSelectedRule as MultiValue<SelectOptionType>)
                      criteriaFields.remove(index)
                    }} />
                )}
              />
            ))}
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

export default AddBadgeForm;