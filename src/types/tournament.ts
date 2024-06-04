import { z } from 'zod';

import { BadgeType } from '@/types/badge';

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
  booking_price: number
  tournament_badges: BadgeType[]
};

export type TournamentDetailType = {
  game_code: string,
  game_name: string,
  game_img_url: string,
  cafe_code: string,
  cafe_name: string,
  cafe_address: string,
  tournament_code: string,
  prizes_img_url: string,
  image_url: string,
  name: string,
  tournament_rules: string,
  difficulty: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  player_slot: number,
  participant_vp: number,
  status: string,
  current_used_slot: number,
  tournament_participants: {
    user_code: string,
    user_name: string,
    user_image_url: string,
    status_winner: boolean,
    status: string,
    additional_info: string,
    position: number,
    reward_point: number
  }[],
  tournament_badges: BadgeType<{ position: number }>[],
  created_date: string,
  updated_date: string,
  deleted_date: string,
  booking_price: number
}

export const AddTournamentSchema = z.object({
  tournament_info: z.object({
    game_code: z.string({ required_error: "You need to select a game." }).min(1, "You need to select a game."),
    image_url: z.string({ required_error: "Image is required." }).min(1, "Image is required."),
    name: z.string({ required_error: "Tournament name is required." }).min(1, "Tournament name is required."),
    tournament_rules: z.string({ required_error: "Tournament rules are required." }).min(1, "Tournament rules are required."),
    level: z.string({ required_error: "Tournament level is required." }).min(1, "Tournament level is required."),
    date: z.object({
      start_date: z.string({ required_error: "Schedule is required." }).min(1, "Schedule is required."),
      end_date: z.string({ required_error: "Schedule is required." }).min(1, "Schedule is required."),
    }, { required_error: "Schedule is required." }),
    time: z.object({
      start_time: z.string({ required_error: "Start time is required." }).min(1, "Start time is required."),
      end_time: z.string({ required_error: "End time is required." }).min(1, "End time is required."),
    }),
    player_slot: z.number({ required_error: "Player slot is required." }).min(1, "Player slot is required."),
    booking_price: z.number({ required_error: "Booking price is required." }).min(1, "Booking price is required."),
    status: z.string({ required_error: "Status is required." }),
    location: z.string({ required_error: "Location is required." }).min(1, "Location is required."),
  }),
  tournament_prize: z.object({
    badge_codes: z.array(z.string(), { required_error: "Badges are required." }).min(1, "Badges are required."),
    prizes_img_url: z.string({ required_error: "Prizes image is required." }).min(1, "Prizes image is required."),
    participant_vp: z.number({ required_error: "Participant VP is required." }).min(1, "Participant VP is required."),
  })
});

export type AddTournamentPayload = {
  game_code: string,
  image_url: string,
  name: string,
  tournament_rules: string,
  level: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  player_slot: number,
  booking_price: number,
  badge_codes: string[],
  prizes_img_url: string,
  status: string,
  participant_vp: number,
  location_code: string
}

export type SetTournamentWinnerType = {
  tournament_participant: {
    position: number,
    badge_code: string,
    user_code: string,
    additional_info: string,
    status: string
  }[]
}