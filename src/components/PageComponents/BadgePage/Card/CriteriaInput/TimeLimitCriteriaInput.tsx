


import { Trash } from "iconsax-react";

import { Button } from "@/components/ui/Buttons";
import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/Form';
import DatePicker from "@/components/ui/Input/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Input/RadioGroup";
import Text from "@/components/ui/Input/Text";
import Typography from "@/components/ui/Typography"


const TimeLimitCriteriaInput: React.FC<{ parentPath: string, onRemove?: () => void }> = ({ parentPath, onRemove }) => {
  const form = useFormField()

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <Typography variant='text-body-l-bold' className="h-fit">
          Time Limit
        </Typography>
        <Button variant='link' onClick={() => onRemove?.()}>
          <Trash className="text-brand-red" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <FormField
          name={`${parentPath}.category`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className='flex flex-row gap-8'>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="time_limit" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Spesific
                      </Typography>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="seasonal" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Typography variant='text-body-l-regular'>
                        Seasonal
                      </Typography>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-row flex-nowrap gap-6">
          <FormField
            control={form.control}
            name={`${parentPath}.start_date`}
            render={({ field }) => (
              <FormItem className="space-y-3 flex-grow basis-0">
                <FormLabel>
                  <Typography variant='paragraph-l-medium'>
                    Start Date
                  </Typography>
                </FormLabel>
                <FormControl>
                  <DatePicker disablePastDate disabled={form.watch(`${parentPath}.end_date`) && { after: form.watch(`${parentPath}.end_date`) }} value={field.value} onChange={(newDate: string) => { form.setValue(`${parentPath}.start_date`, newDate) }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${parentPath}.end_date`}
            render={({ field }) => (
              <FormItem className="space-y-3 flex-grow basis-0">
                <FormLabel>
                  <Typography variant='paragraph-l-medium'>
                    End Date
                  </Typography>
                </FormLabel>
                <FormControl>
                  <DatePicker disablePastDate disabled={form.watch(`${parentPath}.start_date`) && { before: form.watch(`${parentPath}.start_date`) }} value={field.value} onChange={(newDate: string) => { form.setValue(`${parentPath}.end_date`, newDate) }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        {form.watch(`${parentPath}.category`) === 'seasonal' && (
          <FormField
            control={form.control}
            name={`${parentPath}.name`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  <Typography variant='paragraph-l-medium'>
                    Event
                  </Typography>
                </FormLabel>
                <FormControl>
                  <Text placeholder='Enter event name' value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card >
  )
}

export default TimeLimitCriteriaInput