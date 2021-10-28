const API_URL = "https://football-players-b31f2.firebaseio.com/players.json?print=pretty";

export type PlayerType = {
  contractUntil: string;
  dateOfBirth: string;
  jerseyNumber: number,
  name: string;
  nationality: string;
  position: string;
}

export type ResponseType = Record<string, PlayerType>;

export const getPlayers: () => Promise<ResponseType> = () => {
  return fetch(API_URL)
    .then(response => response.json())
};
