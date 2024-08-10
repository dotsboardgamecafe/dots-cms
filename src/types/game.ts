import { z } from 'zod';

import { RoomParticipantSchema } from '@/types/room';

export type GameType = {
  cafe_name: string,
  cafe_code: string,
  cafe_address: string,
  game_code: string,
  game_type: string,
  name: string,
  image_url: string,
  collection_url: string[],
  description: string,
  status: string,
  difficulty: string,
  level: number,
  duration: number,
  minimal_participant: number,
  maximum_participant: number,
  game_categories?: GameCategory[];
  game_related?: string,
  game_rooms?: string,
  game_masters?: {
    admin_code: string,
    email: string,
    name: string,
    user_name: string,
    status: string,
    image_url: string,
    phone_number: string
  };
};

export type GameCategory = {
  category_name: string;
};

export const AddGameSchema = z.object({
  admin_code: z.string({ required_error: 'Game master is required' }).min(1, 'Game master is required'),
  cafe_code: z.string({ required_error: 'Cafe code is required' }).min(1, 'Cafe code is required'),
  name: z.string({ required_error: 'Game name is required' }).min(1, 'Game name is required'),
  image_url: z.string({ required_error: 'Game image is required' }),
  image_url_collection: z.array(z.string({ required_error: 'Game image is required' })),
  description: z.string({ required_error: 'Game description is required' }).min(1, 'Game description is required'),
  level: z.number({ required_error: 'Game level is required' }),
  duration: z.string({ required_error: 'Game duration is required' }).min(1, 'Game duration is required'),
  minimal_participant: z.string({ required_error: 'Game minimum participant is required' }).min(1, 'Game minimum participant is required'),
  maximum_participant: z.string({ required_error: 'Game maximum participant is required' }).min(1, 'Game maximum participant is required'),
  status: z.string({ required_error: 'Game status is required' }),
  game_categories: z.array(z.string()).min(1, 'Game categories is required'),
  game_type: z.string({ required_error: 'Game type is required' }).min(1, 'Game type is required'),
});

export const JoinedPlayersSchema = z.object({
  players: RoomParticipantSchema
}
);

export type AddGamePayload = {
  cafe_code: string;
  game_type: string;
  name: string;
  image_url: string;
  collection_url: string[];
  description: string;
  status: string;
  game_categories: GameCategory[],
  level?: number,
  minimal_participant: number,
  maximum_participant: number,
  admin_code: string,
  duration: number
};