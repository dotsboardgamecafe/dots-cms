import { z } from 'zod';

import { RoomParticipantSchema } from '@/types/room';

export type GameType = {
  "cafe_name": string,
  "cafe_code": string,
  "game_code": string,
  "game_type": string,
  "name": string,
  "image_url": string,
  "collection_url": string,
  "description": string,
  "status": string,
  "difficulty": number,
  "duration": number,
  "minimal_participant": number,
  "maximum_participant": number,
  "game_categories": GameCategory[];
  "game_related": string,
  "game_rooms": string,
  "game_masters": string;
};

export type GameCategory = {
  category_name: string;
};

export const AddGameSchema = z.object( {
  cafe_code: z.string( { required_error: 'Cafe code is required' } ),
  game_type: z.string( { required_error: 'Game type is required' } ),
  name: z.string( { required_error: 'Game name is required' } ),
  image_url: z.string( { required_error: 'Game image is required' } ),
  collection_url: z.string( { required_error: 'Game collection url is required' } ),
  description: z.string( { required_error: 'Game description is required' } ),
  level: z.string( { required_error: 'Game level is required' } ),
  duration: z.number( { required_error: 'Game duration is required' } ),
  players: z.number( { required_error: 'Game player is required' } ),
  status: z.string( { required_error: 'Game status is required' } ),
  game_master: z.string( { required_error: 'Game master is required' } ),
  game_categories: z.array( z.object( {
    category_name: z.string( { required_error: 'Game category is required' } ),
  } ) ),
  game_characteristics: z.array( z.object( {
    characteristic_left: z.string( { required_error: 'Game characteristic left is required' } ),
    characteristic_right: z.string( { required_error: 'Game characteristic right is required' } ),
    value: z.number( { required_error: 'Game characteristic value is required' } ),
  } ) )
} );

export const JoinedPlayersSchema = z.object( {
  players: RoomParticipantSchema
}
);

export type AddGamePayload = z.infer<typeof AddGameSchema>;