'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import InputNumber from '@/components/ui/Input/Number';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { AddGameSchema } from '@/types/game';

const AddGameForm = () => {

  const form = useForm<z.infer<typeof AddGameSchema>>( {
    defaultValues: {
      cafe_code: '',
      game_type: '',
      name: '',
      image_url: '',
      collection_url: '',
      description: '',
      status: '',
      game_categories: [],
      game_characteristics: [],
    },
    resolver: zodResolver( AddGameSchema ),

  } );

  const onSubmit = ( data: z.infer<typeof AddGameSchema> ) => {
    // eslint-disable-next-line no-console
    console.log( data );
  };

  return (
    <>
      <Form { ...form }>
        <form onSubmit={ form.handleSubmit( onSubmit ) } className='flex flex-col gap-8'>
          <section className='form-add-room-wrapper'>

            <FormField
              control={ form.control }
              name="name"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Game Type
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Game Name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="game_type"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Game Type
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Game Master'>
                          <Typography variant='text-body-l-medium' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Andre">Andre</SelectItem>
                        <SelectItem value="Henry">Henry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="game_master"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Game Mechanics
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Set Schedule'>
                          <Typography variant='text-body-l-medium' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Andre">Andre</SelectItem>
                        <SelectItem value="Henry">Henry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="level"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Level
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Level'>
                          <Typography variant='text-body-l-medium' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Andre">Andre</SelectItem>
                        <SelectItem value="Henry">Henry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="duration"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Game Duration
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Set Duration' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="players"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Players
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Set Total Players' onChange={ field.onChange } value={ field.value } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="cafe_code"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Cafe Location
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Level'>
                          <Typography variant='text-body-l-medium' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Andre">Andre</SelectItem>
                        <SelectItem value="Henry">Henry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="game_master"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Price
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Level'>
                          <Typography variant='text-body-l-medium' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Andre">Andre</SelectItem>
                        <SelectItem value="Henry">Henry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="description"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Short Description
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Textarea note='Max 100 characters' placeholder='Game Description...' className='min-h-[225px]' { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
          </section>
          <section className='w-full flex justify-end gap-[16px]'>
            <Button variant='secondary' size="xl" onClick={ ( evt ) => { evt.preventDefault(); form.reset(); } }>
              Cancel
            </Button>
            <Button variant='default' size="xl" type='submit'>
              Add
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
};

export default AddGameForm;