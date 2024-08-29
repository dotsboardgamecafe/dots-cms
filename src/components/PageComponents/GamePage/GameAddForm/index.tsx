/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import { Export, InfoCircle } from 'iconsax-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addGame } from "@/lib/api/games";

import SelectGameCategory from "@/components/PageComponents/GamePage/GameAddForm/select-game-categories";
import SelectGameMechanics from "@/components/PageComponents/GamePage/GameAddForm/select-game-mechanics";
import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import MultiUpload from '@/components/ui/Input/MultiUpload';
import InputNumber from '@/components/ui/Input/Number';
import SliderRange from "@/components/ui/Input/Slider";
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useToast } from "@/components/ui/Toast/use-toast";
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';
import { CafeType } from '@/types/cafes';
import { AddGamePayload, AddGameSchema } from '@/types/game';

type Props = {
  cafes: CafeType[];
  admins: AdminType[];
};

const AddGameForm = ({ cafes, admins }: Props) => {

  const form = useForm<z.infer<typeof AddGameSchema>>({
    defaultValues: {
      level: 0,
      admin_code: '',
      cafe_code: '',
      name: '',
      image_url: '',
      duration: '',
      description: '',
      status: 'active',
      game_categories: [],
      game_type: '',
      image_url_collection: [],
      minimal_participant: '',
      maximum_participant: ''
    },
    resolver: zodResolver(AddGameSchema),

  });

  const [activeTab, setActiveTab] = useState<string>('game-info');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof AddGameSchema>) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    // eslint-disable-next-line no-console, unused-imports/no-unused-vars
    const payload: AddGamePayload = {
      maximum_participant: Number(data.maximum_participant),
      minimal_participant: Number(data.minimal_participant),
      cafe_code: data.cafe_code,
      name: data.name,
      image_url: data.image_url,
      description: data.description,
      status: data.status,
      game_categories: data.game_categories.map((category) => ({ category_name: category })),
      game_type: data.game_type,
      collection_url: data.image_url_collection,
      admin_code: data.admin_code,
      level: data.level,
      duration: Number(data.duration)
    };

    try {
      await addGame({ body: payload })
      toast({
        title: 'Game successfully added!',
        variant: 'default',
      });

      router.push('/game')
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'failed to add the game',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };

  async function checkFieldGameInformationValidation() {
    const result: boolean = await form.trigger(['name', 'game_type', 'game_categories', 'description', 'cafe_code', 'minimal_participant', 'maximum_participant', 'duration', 'level', 'admin_code'])
    return result
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <Tabs defaultValue="game-info" className='w-full gap-6 flex flex-col' value={activeTab} onValueChange={async (newTab) => {
            if (newTab === 'upload-images') {
              const isGameInfoValidationPass: boolean = await checkFieldGameInformationValidation()
              if (!isGameInfoValidationPass) return
            }
            setActiveTab(newTab)
          }}>
            <TabsList className='gap-6'>
              <TabsTrigger value="game-info" className='gap-2'>
                <InfoCircle size={24} variant='Bold' />
                <Typography variant='text-body-xxl-heavy'>
                  Game Information
                </Typography>
              </TabsTrigger>
              <TabsTrigger value="upload-images" className='gap-2'>
                <Export size={24} />
                <Typography variant='text-body-xxl-heavy'>
                  Upload Images
                </Typography>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="game-info">
              <section className='form-3-cols'>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Game Name
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <Text placeholder='Game Name' value={field.value} onChange={field.onChange} maxLength={100} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="game_type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Game Type
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <SelectGameCategory
                          id='game_type'
                          onChange={field.onChange}
                          defaultValue={field.value ? { value: field.value, label: field.value } : undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="game_categories"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Game Mechanics
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <SelectGameMechanics
                          id="game_categories"
                          defaultValue={field.value ? field.value.map((gameMechanic) => ({ value: gameMechanic, label: gameMechanic })) : undefined}
                          onChange={(categoriesOption) => field.onChange(categoriesOption?.map((category) => category.value))}
                        />
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
                        <SliderRange min={0} max={5} step={0.1} value={[field.value]} prefix="Level" onValueChange={(value) => field.onChange(value[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minimal_participant"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Minimal Players
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <InputNumber placeholder='Set Minimal Players' onChange={field.onChange} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maximum_participant"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Maximum Players
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <InputNumber placeholder='Set Maximum Players' onChange={field.onChange} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Game Duration
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <InputNumber placeholder='Set Duration' onChange={field.onChange} value={field.value} suffixIcon='Minutes' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cafe_code"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Cafe Location
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue aria-label={field.value} placeholder='Select Level'>
                              <Typography variant='text-body-l-medium' >
                                {
                                  cafes.find((cafe) => cafe.cafe_code === field.value)?.name || ''
                                }
                              </Typography>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent >
                            {
                              cafes.map((cafe) => (
                                <SelectItem key={cafe.cafe_code} value={cafe.cafe_code}>{cafe.name}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="admin_code"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Game Master
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue aria-label={field.value} placeholder='Select Game master'>
                              <Typography variant='text-body-l-medium' className='capitalize'>
                                {admins.find((admin) => admin.admin_code === field.value)?.name || ''}
                              </Typography>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {
                              admins.map((admin) => (
                                <SelectItem key={admin.admin_code} value={admin.admin_code}>{admin.name}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
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
                        <Textarea placeholder='Game Description...' className='min-h-[200px]' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <section className='w-full flex justify-end gap-[16px]'>
                <Button variant='secondary' size="xl" onClick={(evt) => { evt.preventDefault(); router.push('/game'); }}>
                  Cancel
                </Button>
                <Button variant='default' size="xl" onClick={async (evt) => {
                  evt.preventDefault();
                  const isValidationPass: boolean = await checkFieldGameInformationValidation()
                  if (!isValidationPass) return
                  setActiveTab('upload-images');
                }}>
                  Next
                </Button>
              </section>
            </TabsContent>

            <TabsContent value="upload-images">
              <section className='grid grid-cols-2 gap-8'>
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Upload Game Cover 1:1
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <Upload onChange={field.onChange} value={field.value} description="Suggested Resolution 400 x 400 px" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image_url_collection"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Upload Game Board
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <MultiUpload onChange={(value) => { field.onChange(value) }} value={field.value} description="Suggested Resolution 400 x 400 px" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className='w-full flex justify-end gap-[16px] col-span-2'>
                  <Button variant='secondary' size="xl" onClick={(evt) => { evt.preventDefault(); router.push('/game'); }}>
                    Cancel
                  </Button>
                  <Button variant='default' size="xl" type="submit" loading={isSubmitting} disabled={isSubmitting}>
                    Add
                  </Button>
                </section>
              </section>
            </TabsContent>
          </Tabs>

        </form>
      </Form >
    </>
  );
};

export default AddGameForm;