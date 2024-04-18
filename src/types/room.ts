
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