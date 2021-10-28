import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlayerType } from '../../services';
import { RootState } from '../index';

type PlayerStateType = {
  players: PlayerType[];
  filteredPlayers: PlayerType[];
};

type PlayerArrayType = {
  players: PlayerType[];
};

type FilteredPlayerArrayType = {
  filteredPlayers: PlayerType[];
};

const initialState: PlayerStateType = {
  players: [],
  filteredPlayers: [],
};

export const playerSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    setPlayers:
      (state, action: PayloadAction<PlayerArrayType>) => {
        state.players = action.payload.players
      },
    setFilteredPlayers:
      (state, action: PayloadAction<FilteredPlayerArrayType>) => {
        state.filteredPlayers = action.payload.filteredPlayers
      },
  },
});

export const { setPlayers, setFilteredPlayers } = playerSlice.actions;
export const selectPlayers = (state: RootState) => state.players;
export default playerSlice.reducer;
