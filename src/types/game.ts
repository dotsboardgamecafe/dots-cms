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
  admin_code: z.string( { required_error: 'Game master is required' } ),
  name: z.string( { required_error: 'Game name is required' } ),
  image_url: z.string( { required_error: 'Game image is required' } ),
  image_url_collection: z.array( z.string( { required_error: 'Game image is required' } ) ),
  collection_url: z.string( { required_error: 'Game collection url is required' } ),
  description: z.string( { required_error: 'Game description is required' } ),
  level: z.string( { required_error: 'Game level is required' } ),
  duration: z.string( { required_error: 'Game duration is required' } ),
  players: z.string( { required_error: 'Game player is required' } ),
  status: z.string( { required_error: 'Game status is required' } ),
  game_categories: z.array( z.string() ),
  // game_characteristics: z.array( z.string() )
} );

export const JoinedPlayersSchema = z.object( {
  players: RoomParticipantSchema
}
);

export type AddGamePayload = z.infer<typeof AddGameSchema>;