import { z } from 'zod';

export type RoomType = {
  cafe_id: string,
  cafe_code: string,
  cafe_name: string,
  cafe_address: string,
  room_code: string,
  room_type: string,
  room_img_url: string,
  name: string,
  description: string,
  instruction: string,
  difficulty: string,
  start_date: string,
  end_date: string,
  instagram_link: string,
  status: string,
  game_master_name: string,
  game_master_image_url: string,
  maximum_participant: number;
  current_used_slot: number;
};

export type RoomDetailType = {
  game_master_code: string;
  game_master_name: string;
  game_master_img_url: string;
  game_code: string;
  game_name: string;
  game_img_url: string;
  cafe_name: string;
  cafe_address: string;
  room_code: string;
  room_type: 'normal' | 'special_event';
  name: string;
  description: string;
  difficulty: string;
  start_date: string;
  end_date: string;
  instagram_link: string;
  status: string;
  booking_price: number;
  maximum_participant: number;
  reward_point: number;
  current_used_slot: number;
  room_participants: unknown[];
};

export const AddRoomSchema = z.object( {
  room_type: z.enum( [ "normal", "special_event" ], {
    required_error: "You need to select a room type.",
  } ),
  room_name: z.string( { required_error: "You need to enter a room name.", } ),
  game_name: z.string( { required_error: "You need to select a game.", } ),
  game_master: z.string( { required_error: "You need to select a game master.", } ),
  schedule: z.object( {
    start_date: z.date(),
    end_date: z.date(),
  } ),
  location: z.string( { required_error: "You need to select a location.", } ),
  level: z.string( { required_error: "You need to select a level.", } ),
  player_slot: z.string( { required_error: "You need to set a player slot availability.", } ),
  price: z.string( { required_error: "You need enter a price for the game room.", } ),
  points: z.string( { required_error: "You need select a points for the game room.", } ),
  description: z.string( { required_error: "You need to enter a description for the game room.", } ),
  banner: z.string( { required_error: "You need to upload banner for the game room.", } ),
} );

export type AddRoomPayload = {
  game_master_id?: number,
  game_id?: number,
  room_type?: string;
  name?: string;
  description?: string;
  instruction?: string;
  difficulty?: string;
  start_date?: string;
  end_date?: string;
  maximum_participant?: number;
  booking_price?: number;
  reward_point?: number;
  instagram_link?: string;
  image_url?: string;
  status?: string;
  location_code?: string;
};