
import { Trash } from "iconsax-react";

import { Button } from "@/components/ui/Buttons";
import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/Form';
import InputNumber from "@/components/ui/Input/Number";
import Typography from "@/components/ui/Typography"


const AmountOfBoardGamePlayedCriteriaInput: React.FC<{ parentPath: string, onRemove?: () => void }> = ({ parentPath, onRemove }) => {
  const form = useFormField()

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <Typography variant='text-body-l-bold' className="h-fit">
          Number of Board Games Played
        </Typography>
        <Button variant='link' onClick={() => onRemove?.()}>
          <Trash className="text-brand-red" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name={`${parentPath}`}
          render={({ field }) => (
            <FormItem className="space-y-3 flex-grow basis-0">
              <FormLabel>
                <Typography variant='paragraph-l-medium'>
                  Total Played
                </Typography>
              </FormLabel>
              <FormControl>
                <InputNumber placeholder='Enter minimum played' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card >
  )
}

export default AmountOfBoardGamePlayedCriteriaInput