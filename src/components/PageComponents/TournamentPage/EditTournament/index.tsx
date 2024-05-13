'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateRoom } from '@/lib/api/room';

import { Button } from '@/components/ui/Buttons';
import DateTime from '@/components/ui/DateTime';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import Number from '@/components/ui/Input/Number';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';
import { CafeType } from '@/types/cafes';
import { GameType } from '@/types/game';
import { AddRoomPayload, AddRoomSchema, RoomDetailType } from '@/types/room';

type Props = {
  games: GameType[];
  admins: AdminType[];
  cafes: CafeType[];
  roomDetail: RoomDetailType;
};
const EditRoomForm = ( { games, admins, cafes, roomDetail }: Props ) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AddRoomSchema>>( {
    defaultValues: {
      player_slot: String( roomDetail.maximum_participant ),
      room_name: roomDetail.name,
      price: String( roomDetail.booking_price ),
      points: String( roomDetail.reward_point ),
      schedule: {
        start_date: dayjs( roomDetail.start_date ).toDate(),
        end_date: dayjs( roomDetail.end_date ).toDate(),
      },
      banner: roomDetail.room_banner_url,
      description: roomDetail.description,
      level: roomDetail.difficulty,
      room_type: roomDetail.room_type,
      location: roomDetail.cafe_code,
      game_master: roomDetail.game_master_code,
      game_code: roomDetail.game_code,
    },
    resolver: zodResolver( AddRoomSchema ),
  } );

  const onSubmit = async ( data: z.infer<typeof AddRoomSchema> ) => {
    // eslint-disable-next-line no-console
    const payload: AddRoomPayload = {
      booking_price: +data.price,
      difficulty: data.level,
      end_date: dayjs( data.schedule.end_date ).toISOString(),
      start_date: dayjs( data.schedule.start_date ).toISOString(),
      game_code: data.game_code,
      game_master_code: data.game_master,
      instruction: 'instruction',
      maximum_participant: +data.player_slot,
      name: data.room_name,
      reward_point: +data.points,
      room_type: data.room_type,
      status: 'active',
      description: data.description,
      location_code: data.location,
      image_url: data.banner,
      cafe_code: data.location,
    };
    await updateRoom( { body: payload, param: roomDetail.room_code } );
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
                          <RadioGroupItem value="normal" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Typography variant='text-body-l-regular'>
                            General Room
                          </Typography>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="special_event" />
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
              name="room_name"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Room Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Enter Room Name' { ...field } />
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
                      Game
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
              name="game_master"
              render={ ( { field } ) => {
                return (
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
                              { admins.find( admin => admin.admin_code === field.value )?.name || '' }
                            </Typography>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent >
                          {
                            admins.map( admin => (
                              <SelectItem value={ admin.admin_code } key={ admin.admin_code }>{ admin.name }</SelectItem>
                            ) )
                          }
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              } }
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
                    <DateTime
                      onDateChange={ ( date ) => {
                        field.onChange( { ...field.value, start_date: date } );
                      } }
                      onEndDateChange={ ( date ) => {
                        field.onChange( { ...field.value, end_date: date } );
                      } }
                      end_date={ field.value?.end_date }
                      start_date={ field.value?.start_date }
                    />
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
                            { cafes.find( cafe => cafe.cafe_code === field.value )?.name || '' }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        {
                          cafes.map( ( cafe, index ) => (
                            <SelectItem value={ cafe.cafe_code } key={ `${cafe.cafe_code}-${index}` }>{ cafe.name }</SelectItem>
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
              name="player_slot"
              render={ ( { field } ) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Player Slot
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Number placeholder='Set player slot' onChange={ field.onChange } value={ field.value } />
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
                    <Number placeholder='Set Price' onChange={ field.onChange } value={ field.value } />
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
                    <Number placeholder='Set Points' onChange={ field.onChange } value={ field.value } />
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
                    <Upload onChange={ field.onChange } value={ field.value } />
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
            <Button variant='secondary' size="xl" onClick={ ( evt ) => { router.back(); } }>
              Cancel
            </Button>
            <Button variant='default' size="xl" type='submit'>
              Save
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
};

export default EditRoomForm;