/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import { Export, InfoCircle } from 'iconsax-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import InputNumber from '@/components/ui/Input/Number';
import SelectMultiple from '@/components/ui/Input/SelectMultiple';
import Text from '@/components/ui/Input/Text';
import Textarea from '@/components/ui/Input/TextArea';
import Upload from '@/components/ui/Input/Upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';
import { CafeType } from '@/types/cafes';
import { AddGameSchema } from '@/types/game';

type Props = {
  cafes: CafeType[];
  admins: AdminType[];
};

const AddGameForm = ( { cafes, admins }: Props ) => {

  const form = useForm<z.infer<typeof AddGameSchema>>( {
    defaultValues: {
      cafe_code: '',
      name: '',
      image_url: '',
      duration: '',
      collection_url: '',
      description: '',
      status: '',
      game_categories: [],
      game_type: '',
      image_url_collection: []
    },
    resolver: zodResolver( AddGameSchema ),

  } );
  const [ activeTab, setActiveTab ] = useState<string>( 'game-info' );

  const gameMechanicsOptions = [
    { value: 'arcade', label: 'Arcade' },
    { value: 'spy', label: 'Spy' },
    { value: 'worker_placements', label: 'Worker Placements' },
    { value: 'card_game', label: 'Card game' },
    { value: 'dice_game', label: 'Dice game' },
    { value: 'role_play', label: 'Role Play' },
  ];

  const gameTypeOptions = [ 'Board Game', 'Card Game', 'Dice Game', 'Role Play', 'Trivia Game' ];
  const onSubmit = ( data: z.infer<typeof AddGameSchema> ) => {
    // eslint-disable-next-line no-console
    console.log( data );
  };

  return (
    <>
      <Form { ...form }>
        <form onSubmit={ form.handleSubmit( onSubmit ) } className='flex flex-col gap-8'>
          <Tabs defaultValue="game-info" className='w-full gap-6 flex flex-col' value={ activeTab } onValueChange={ setActiveTab }>
            <TabsList className='gap-6'>
              <TabsTrigger value="game-info" className='gap-2'>
                <InfoCircle size={ 24 } variant='Bold' />
                <Typography variant='text-body-xxl-heavy'>
                  Game Information
                </Typography>
              </TabsTrigger>
              <TabsTrigger value="upload-images" className='gap-2'>
                <Export size={ 24 } />
                <Typography variant='text-body-xxl-heavy'>
                  Upload Images
                </Typography>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="game-info">
              <section className='form-3-cols'>

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
                            <SelectValue aria-label={ field.value } placeholder='Select Game type'>
                              <Typography variant='text-body-l-medium' className="capitalize" >
                                { field.value }
                              </Typography>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent >
                            {
                              gameTypeOptions.map( ( item, index ) => (
                                <SelectItem key={ index } value={ item } className='capitalize'>{ item }</SelectItem>
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
                  name="game_categories"
                  render={ ( { field } ) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Game Mechanics
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <SelectMultiple
                          placeholder='Select Game Mechanics'
                          options={ gameMechanicsOptions }
                          closeMenuOnSelect={ false }
                          onChange={ ( value: any ) => field.onChange( value.map( ( item: any ) => item.value ) ) }
                        />
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
                              <Typography variant='text-body-l-medium' className="capitalize" >
                                { field.value }
                              </Typography>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent >
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
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
                        <InputNumber placeholder='Set Duration' onChange={ field.onChange } value={ field.value } />
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
                        <InputNumber placeholder='Set Total Players' onChange={ field.onChange } value={ field.value } />
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
                                {
                                  cafes.find( ( cafe ) => cafe.cafe_code === field.value )?.name || ''
                                }
                              </Typography>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent >
                            {
                              cafes.map( ( cafe ) => (
                                <SelectItem key={ cafe.cafe_code } value={ cafe.cafe_code }>{ cafe.name }</SelectItem>
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
                  name="admin_code"
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
                            <SelectValue aria-label={ field.value } placeholder='Select Game master'>
                              <Typography variant='text-body-l-medium' className='capitalize'>
                                { admins.find( ( admin ) => admin.admin_code === field.value )?.name || '' }
                              </Typography>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {
                              admins.map( ( admin ) => (
                                <SelectItem key={ admin.admin_code } value={ admin.admin_code }>{ admin.name }</SelectItem>
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
                <Button variant='default' size="xl" onClick={ ( evt ) => { evt.preventDefault(); setActiveTab( 'upload-images' ); } }>
                  Next
                </Button>
              </section>
            </TabsContent>

            <TabsContent value="upload-images">
              <section className='grid grid-cols-2 gap-8'>
                <FormField
                  control={ form.control }
                  name="image_url"
                  render={ ( { field } ) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Upload Game Cover 1:1
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
                  name="image_url_collection"
                  render={ ( { field } ) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <Typography variant='paragraph-l-medium'>
                          Upload Game Board
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <Upload onChange={ ( value ) => field.onChange( [ value ] ) } />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <section className='w-full flex justify-end gap-[16px] col-span-2'>
                  <Button variant='secondary' size="xl" onClick={ ( evt ) => { evt.preventDefault(); form.reset(); } }>
                    Cancel
                  </Button>
                  <Button variant='default' size="xl" type="submit">
                    Add
                  </Button>
                </section>
              </section>
            </TabsContent>
          </Tabs>

        </form>
      </Form>
    </>
  );
};

export default AddGameForm;