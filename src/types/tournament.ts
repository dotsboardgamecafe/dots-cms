import { z } from 'zod';

export type TournamentType = {
  game_code: string;
  game_name: string;
  game_img_url: string;
  cafe_code: string;
  cafe_name: string;
  cafe_address: string;
  tournament_code: string;
  prizes_img_url: string;
  image_url: string;
  name: string;
  tournament_rules: string;
  difficulty: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
  status: string;
  player_slot: number;
  participant_vp: number;
  current_used_slot: number;
};

export const AddTournamentSchema = z.object( {
  game_code: z.string( { required_error: "You need to select a game." } ),
  image_url: z.string( { required_error: "Image is required." } ),
  name: z.string( { required_error: "Tournament name is required." } ),
  tournament_rules: z.string( { required_error: "Tournament rules are required." } ),
  level: z.string( { required_error: "Tournament level is required." } ),
  date: z.string( { required_error: "date is required." } ),
  time: z.object( {
    start_time: z.string( { required_error: "Start time is required." } ),
    end_time: z.string( { required_error: "End time is required." } ),
  } ),
  player_slot: z.number( { required_error: "Player slot is required." } ),
  booking_price: z.number( { required_error: "Booking price is required." } ),
  badge_codes: z.array( z.string(), { required_error: "Badges are required." } ),
  prizes_img_url: z.string( { required_error: "Prizes image is required." } ),
  status: z.string( { required_error: "Status is required." } ),
  participant_vp: z.number( { required_error: "Participant VP is required." } ),
  location: z.string( { required_error: "Location is required." } ),
} );