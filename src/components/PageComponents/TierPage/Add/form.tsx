'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { DateRangePicker } from '@/components/ui/Input/DateRange';
import InputNumber from '@/components/ui/Input/Number';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import TimeRangeInput from '@/components/ui/Input/TimeRangeInput';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';
import { CafeType } from '@/types/cafes';
import { GameType } from '@/types/game';
import { AddTournamentSchema } from '@/types/tournament';

type Props = {
  games: GameType[];
  admins: AdminType[];
  cafes: CafeType[];
};

const AddTournamentForm = ( { games, admins, cafes }: Props ) => {

  const form = useForm<z.infer<typeof AddTournamentSchema>>( {
    defaultValues: {
      time: {
        start_time: '',
        end_time: ''
      }
    },
    resolver: zodResolver( AddTournamentSchema ),
  } );

  const onSubmit = async ( data: z.infer<typeof AddTournamentSchema> ) => {
    // eslint-disable-next-line no-console
    console.log( data );
    // const payload: AddRoomPayload = {
    //   booking_price: +data.price,
    //   difficulty: data.level,
    //   end_date: dayjs( data.schedule.end_date ).toISOString(),
    //   start_date: dayjs( data.schedule.start_date ).toISOString(),
    //   game_master_code: data.game_master,
    //   instruction: 'instruction',
    //   maximum_participant: +data.player_slot,
    //   name: data.room_name,
    //   reward_point: +data.points,
    //   room_type: data.room_type,
    //   status: 'active',
    //   description: data.description,
    //   location_code: data.location,
    //   game_code: data.game_code,
    //   image_url: data.banner
    // };
    // await createRoom( { body: payload } );
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
                      Tournament Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Enter Tournament Name' { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="game_code"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Game Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={ field.value } onValueChange={ field.onChange }>
                      <SelectTrigger>
                        <SelectValue aria-label={ field.value } placeholder='Select Game'>
                          <Typography variant='text-body-l-medium' >
                            {
                              games.find( game => game.game_code === field.value )?.name || ''
                            }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        {
                          games.map( game => (
                            <SelectItem value={ game.game_code } key={ game.game_code }>{ game.name }</SelectItem>
                          ) )
                        }
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
                    <InputNumber placeholder='Enter Slot' onChange={ ( e ) => field.onChange( +e.target.value ) } value={ field.value } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="booking_price"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Schedule
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    {/* <DateTime
                      onDateChange={ ( date ) => {
                        field.onChange( { ...field.value, start_date: date } );
                      } }
                      onEndDateChange={ ( date ) => {
                        field.onChange( { ...field.value, end_date: date } );
                      } }
                      end_date={ field.value?.end_date }
                      start_date={ field.value?.start_date }
                    /> */}
                    <DateRangePicker />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="time"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Time
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <TimeRangeInput
                      start_time={ field.value.start_time }
                      end_time={ field.value.end_time }
                      onStartTimeChange={ ( time ) => field.onChange( { ...field.value, start_time: time } ) }
                      onEndTimeChange={ ( time ) => field.onChange( { ...field.value, end_time: time } ) }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="booking_price"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Price
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Set Price' onChange={ field.onChange } value={ field.value } />
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
                          <Typography variant='text-body-l-medium' className='capitalize' >
                            { field.value }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
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
                          <Typography variant='text-body-l-medium' className='capitalize' >
                            { cafes.find( cafe => cafe.cafe_code === field.value )?.name || '' }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        {
                          cafes.map( cafe => (
                            <SelectItem value={ cafe.cafe_code } key={ cafe.cafe_code }>{ cafe.name }</SelectItem>
                          ) )
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            {/* empty div for separator */ }
            <div></div>
            <FormField
              control={ form.control }
              name="image_url"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Upload Banner
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
              name="tournament_rules"
              render={ ( { field } ) => (
                <FormItem className="space-y-3 col-span-2">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Tournament Rules
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

export default AddTournamentForm;