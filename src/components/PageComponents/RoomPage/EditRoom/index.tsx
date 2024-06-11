'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { SingleValue } from "react-select";
import { z } from 'zod';

import { getGameList } from "@/lib/api/games";
import { updateRoom } from '@/lib/api/room';

import { Button } from '@/components/ui/Buttons';
import DateTime from '@/components/ui/DateTime';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import InputNumber from '@/components/ui/Input/Number';
import { RadioGroup, RadioGroupItem } from '@/components/ui/Input/RadioGroup';
import { SelectOptionType } from "@/components/ui/Input/SelectMultiple";
import SelectAsync from "@/components/ui/Input/SelectMultiple/async";
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useToast } from "@/components/ui/Toast/use-toast";
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';
import { Pagination } from "@/types/network";
import { AddRoomPayload, AddRoomSchema, RoomDetailType } from '@/types/room';

type Props = {
  admins: AdminType[];
  roomDetail: RoomDetailType;
};

type GameOptionType = SelectOptionType & {
  data: {
    cafe_name: string
    cafe_code: string
  }
}

const EditRoomForm = ({ admins, roomDetail }: Props) => {
  const [selectedGameBoard, setSelectedGameBoard] = useState<SingleValue<GameOptionType>>(roomDetail ? { value: roomDetail.game_code, label: `${roomDetail.game_name} ${roomDetail.cafe_name}`, data: { cafe_name: roomDetail.cafe_name, cafe_code: roomDetail.cafe_code } } : null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<z.infer<typeof AddRoomSchema>>({
    defaultValues: {
      player_slot: String(roomDetail.maximum_participant),
      room_name: roomDetail.name,
      price: roomDetail.booking_price,
      points: String(roomDetail.reward_point),
      schedule: {
        start_date: dayjs(roomDetail.start_date).toDate(),
        end_date: dayjs(roomDetail.end_date).toDate(),
      },
      banner: roomDetail.room_banner_url,
      description: roomDetail.description,
      level: roomDetail.difficulty,
      room_type: roomDetail.room_type,
      location: roomDetail.cafe_code,
      game_master: roomDetail.game_master_code,
      game_code: roomDetail.game_code,
    },
    resolver: zodResolver(AddRoomSchema),
  });

  const onSubmit = async (data: z.infer<typeof AddRoomSchema>) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    // eslint-disable-next-line no-console
    const payload: AddRoomPayload = {
      booking_price: +data.price,
      difficulty: data.level,
      end_date: dayjs(data.schedule.end_date).toISOString(),
      start_date: dayjs(data.schedule.start_date).toISOString(),
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

    try {
      await updateRoom({ body: payload, param: roomDetail.room_code });
      toast({
        title: 'Successfully update the room',
        variant: 'default',
      });

      router.replace('/room')
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Something went wrong',
          description: 'failed to update the room',
          variant: 'destructive',
        });
      }

      setIsSubmitting(false)
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadGameOptions = async (search: string, loadedOptions: any, pagination?: Pagination) => {
    const payload = { ...pagination }
    if (search) payload.keyword = search

    try {
      const response = await getGameList({ pagination: { ...payload }, query: { status: 'active' } })
      const newOptions = response.data.map((game) => ({ value: game.game_code, label: `${game.name} ${game.cafe_name}`, data: game }))

      return {
        options: [...loadedOptions, ...newOptions],
        hasMore: (response.pagination.total_page || 1) < (response.pagination.page || 1),
        additional: response.pagination
      }
    } catch (error) {
      return {
        options: loadedOptions,
        hasMore: (pagination?.total_page || 1) < (pagination?.page || 1),
        additional: pagination
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGameBoardChange = (newValue: SingleValue<GameOptionType>, callBack: (data: any) => void) => {
    form.setValue('location', newValue?.data.cafe_code || '')
    callBack(newValue?.value)
    setSelectedGameBoard(newValue)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <section className='form-add-room-wrapper'>
            <FormField
              control={form.control}
              name="room_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Room Type
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
              )}
            />
            <FormField
              control={form.control}
              name="room_name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Room Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Enter Room Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="game_code"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Game
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <SelectAsync<false, GameOptionType>
                      loadOptions={loadGameOptions}
                      placeholder='Select game board'
                      value={selectedGameBoard}
                      onChange={(newValue) => handleGameBoardChange(newValue, field.onChange)}
                      isSearchable
                    />
                    {/* <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue aria-label={field.value} placeholder='Select Game'>
                          <Typography variant='text-body-l-medium' >
                            {
                              games.find(game => game.game_code === field.value)?.name || ''
                            }
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        {
                          games.map(game => (
                            <SelectItem value={game.game_code} key={game.game_code}>{game.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="game_master"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      <Typography variant='paragraph-l-medium'>
                        Game Master
                      </Typography>
                    </FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue aria-label={field.value} placeholder='Select Game Master'>
                            <Typography variant='text-body-l-medium' >
                              {admins.find(admin => admin.admin_code === field.value)?.name || ''}
                            </Typography>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent >
                          {
                            admins.map(admin => (
                              <SelectItem value={admin.admin_code} key={admin.admin_code}>{admin.name}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Schedule
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <DateTime
                      onDateChange={(date) => {
                        field.onChange({ ...field.value, start_date: date });
                      }}
                      onEndDateChange={(date) => {
                        field.onChange({ ...field.value, end_date: date });
                      }}
                      end_date={field.value?.end_date}
                      start_date={field.value?.start_date}
                    />
                  </FormControl>
                  <FormMessage message={dayjs(field.value.start_date).isBefore(new Date) ? "You can't select the past time" : 'You need to select the schedule'} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Location
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text value={selectedGameBoard?.data.cafe_name} disabled />
                    {/* <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue aria-label={field.value} placeholder='Select Location'>
                          <Typography variant='text-body-l-medium' >
                            {cafes.find(cafe => cafe.cafe_code === field.value)?.name || ''}
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent >
                        {
                          cafes.map((cafe, index) => (
                            <SelectItem value={cafe.cafe_code} key={`${cafe.cafe_code}-${index}`}>{cafe.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Level
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue aria-label={field.value} placeholder='Select Level'>
                          <Typography variant='text-body-l-medium' className='capitalize' >
                            {field.value}
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
              )}
            />
            <FormField
              control={form.control}
              name="player_slot"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Player Slot
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Set player slot' onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Price
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber prefixIcon='Rp. ' placeholder='Set Price' onChange={(event) => field.onChange(+event.target.value)} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Points
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder='Set Points' onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Banner
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Upload onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Short Description
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Textarea note='Max 100 characters' maxLength={100} placeholder='Game Description...' className='min-h-[225px]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className='w-full flex justify-end gap-[16px]'>
            <Button variant='secondary' size="xl" onClick={(evt) => { evt.preventDefault(); router.replace('/room'); }}>
              Cancel
            </Button>
            <Button variant='default' size="xl" type='submit' loading={isSubmitting} disabled={isSubmitting}>
              Save
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
};

export default EditRoomForm;