


import { Trash } from "iconsax-react";

import { Button } from "@/components/ui/Buttons";
import { Card, CardContent, CardHeader } from "@/components/ui/Card/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/Form';
import InputNumber from "@/components/ui/Input/Number";
import Typography from "@/components/ui/Typography"


const TotalSpentCriteriaInput: React.FC<{ parentPath: string, onRemove?: () => void }> = ({ parentPath, onRemove }) => {
  const form = useFormField()

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <Typography variant='text-body-l-bold' className="h-fit">
          Total Spent
        </Typography>
        <Button variant="link" onClick={() => onRemove?.()}>
          <Trash className="text-brand-red" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name={parentPath}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <Typography variant='paragraph-l-medium'>
                  Amount of Rupiah Spent
                </Typography>
              </FormLabel>
              <FormControl>
                <InputNumber prefixIcon='Rp ' placeholder='Enter minimum spent' value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card >
  )
}

export default TotalSpentCriteriaInput