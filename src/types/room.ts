import { z } from 'zod';

export type RoomType = {
  type: string,
  gameName: string;
  schedule: string;
  location: string;
  level: string;
  slot: string;
  status: string;
  gameMaster: {
    name: string;
    profileImage: string;
  };
};

export const AddRoomSchema = z.object( {
  room_type: z.enum( [ "general", "event" ], {
    required_error: "You need to select a room type.",
  } ),
  game_name: z.string( { required_error: "You need to select a game.", } ),
  game_master: z.string( { required_error: "You need to select a game master.", } ),
  schedule: z.string( { required_error: "You need to select a schedule.", } ),
  location: z.string( { required_error: "You need to select a location.", } ),
  level: z.string( { required_error: "You need to select a level.", } ),
  player_slot: z.string( { required_error: "You need to set a player slot availability.", } ),
  price: z.string( { required_error: "You need enter a price for the game room.", } ),
  points: z.string( { required_error: "You need select a points for the game room.", } ),
  description: z.string( { required_error: "You need to enter a description for the game room.", } ),
  banner: z.string( { required_error: "You need to upload banner for the game room.", } ),
} );

export type AddRoomPayload = z.infer<typeof AddRoomSchema>;