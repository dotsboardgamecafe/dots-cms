'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { setRoomWinner } from '@/lib/api/room';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField } from '@/components/ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { Positions } from '@/constant/winner_position';

import { JoinedPlayersSchema } from '@/types/game';
import { RoomParticipant, SetRoomWinnerPayload } from '@/types/room';

type Props = {
  players: RoomParticipant[];
};

const PlayersTab = ( { players }: Props ) => {
  const param = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof JoinedPlayersSchema>>( {
    defaultValues: {
      players
    },
    resolver: zodResolver( JoinedPlayersSchema ),
  } );

  const { fields, append, remove, } = useFieldArray( { control: form.control, name: 'players' } );

  const onSubmit = async ( data: z.infer<typeof JoinedPlayersSchema> ) => {
    try {
      const body: SetRoomWinnerPayload = {
        room_participant: data.players.map( ( player ) => {
          return {
            user_code: player.user_code,
            position: player.position,
            badge_code: '',
          };
        } )
      };
      const res = await setRoomWinner( { body, param: param.room_code as string } );
    } catch ( error ) {
      if ( error instanceof Error ) {
        toast( {
          title: 'Something went wrong',
          description: error.message,
          variant: 'destructive',
        } );
      }
    }

  };

  const shouldDisableOption = ( currentPosition: number ) => {
    return form.getValues( 'players' ).some( ( player ) => player.position > 0 && player.position === currentPosition );
  };

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) }>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Typography variant='text-body-l-medium' className='text-gray-500'>
                  Players
                </Typography>
              </TableHead>
              <TableHead>
                <Typography variant='text-body-l-medium' className='text-gray-500'>
                  Additional Info
                </Typography>
              </TableHead>
              <TableHead>
                <Typography variant='text-body-l-medium' className='text-gray-500'>
                  Position
                </Typography>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              fields.map( ( player, index ) => (
                <TableRow key={ player.user_code } >
                  <TableCell className='py-[10px] flex flex-row items-center gap-3'>
                    <Image alt='player-image' src={ player.user_image_url || '/images/avatar-not-found.png' } width={ 48 } height={ 48 } className='rounded-full' />
                    <Typography variant='paragraph-l-regular' className='text-gray-900'>
                      { player.user_name }
                    </Typography>
                  </TableCell>
                  <TableCell className='py-[10px]'>
                    <Typography variant='paragraph-l-regular' className='text-gray-900 capitalize'>
                      { player.additional_info || '-' }
                    </Typography>
                  </TableCell>
                  <TableCell className='py-[10px]'>
                    <FormField
                      control={ form.control }
                      name={ `players.${index}.position` }
                      render={ ( { field } ) => (
                        <FormControl>
                          <Select defaultValue='na' value={ `${field.value}` } onValueChange={ ( value ) => field.onChange( +value ) }>
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="N/A" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                Positions.map( ( { position, label } ) => (
                                  <SelectItem key={ position } value={ position.toString() } disabled={ shouldDisableOption( position ) }>
                                    { label }
                                  </SelectItem>
                                ) )
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>
                      ) }
                    />
                  </TableCell>
                </TableRow>
              ) )
            }
          </TableBody>
        </Table>
        <div className='flex justify-end mt-4'>
          <Button type='submit'>
            Submit Winner
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PlayersTab;