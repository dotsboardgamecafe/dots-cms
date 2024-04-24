'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { AddRoomSchema } from '@/types/room';

const AddRoomForm = () => {

  const form = useForm<z.infer<typeof AddRoomSchema>>( {
    defaultValues: {
      player_slot: '',
      price: '',
      points: '',
    },
    resolver: zodResolver( AddRoomSchema ),
  } );

  const onSubmit = ( data: z.infer<typeof AddRoomSchema> ) => {
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
              name="room_type"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Room Type
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={ field.onChange }
                      defaultValue={ field.value }
                      className="flex flex-row "
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="general" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Typography variant='text-body-l-regular'>
                            General Room
                          </Typography>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="event" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Typography variant='text-body-l-regular'>
                            Special Event
                          </Typography>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="game_name"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Room Type
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Game'>
                          <Typography variant='text-body-l-medium' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="splendor">Splendor</SelectItem>
                        <SelectItem value="spyfall">Spyfall</SelectItem>
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
                      Game Master
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
              name="schedule"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Schedule
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
              name="location"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Location
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Location'>
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
              name="player_slot"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Player Slot
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Set Slot Availability' onChange={ field.onChange } value={ field.value } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="price"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Price
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Set Price' onChange={ field.onChange } value={ field.value } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="points"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Points
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Set Points'>
                          <Typography variant='text-body-l-medium' className='text-neutral-ink' >
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
              name="banner"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Banner
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Upload onChange={ field.onChange } />
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

export default AddRoomForm;