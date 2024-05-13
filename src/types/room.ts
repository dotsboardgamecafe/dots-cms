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
  cafe_code: string;
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
  room_participants: RoomParticipant[];
  room_banner_url: string;
};

export type RoomParticipant = {
  user_code: string;
  user_name: string;
  user_image_url: string;
  status_winner: boolean,
  status: string;
  additional_info: string;
  position: number;
  reward_point: number;
};

export const RoomParticipantSchema = z.array( z.object( {
  user_code: z.string(),
  user_name: z.string(),
  user_image_url: z.string(),
  status_winner: z.boolean(),
  status: z.string(),
  additional_info: z.string(),
  position: z.number(),
  reward_point: z.number(),
} ) );

export const AddRoomSchema = z.object( {
  room_type: z.enum( [ "normal", "special_event" ], {
    required_error: "You need to select a room type.",
  } ),
  room_name: z.string( { required_error: "You need to enter a room name.", } ),
  game_code: z.string( { required_error: "You need to select a game.", } ),
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
  game_master_code?: string,
  game_code?: string;
  cafe_code?: string;
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

export type SetRoomWinnerPayload = {
  position: number;
  badge_code: string;
  user_code: string;
};