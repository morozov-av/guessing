import { PLAYER_STORAGE_KEY } from '../constants';
import { storage } from '../helpers/localStorage';
import { Player } from '../models/reduxModels';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlayerService from '../service/playerService';

export const createPlayer = createAsyncThunk('player/createPlayer', async (name: string) => {
  const player: Player = await PlayerService.createPlayer(name);
  return player;
});

const currentPlayer: string | null = storage.get(PLAYER_STORAGE_KEY);
const initialPlayerState: Player = {
  status: null,
  id: null,
  playerName: currentPlayer,
  points: null
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    logout(state) {
      state.status = 'idle';
      state.playerName = null;
      state.id = null;
      state.points = null;
      storage.set(PLAYER_STORAGE_KEY, null);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createPlayer.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        const { id, playerName, points } = action.payload ;
        storage.set(PLAYER_STORAGE_KEY, playerName);
        state.status = 'idle';
        state.playerName = playerName;
        state.id = id;
        state.points = points;
      })
      .addCase(createPlayer.rejected, (state, action) => {
        console.log(action);
        state.status = 'idle';
        state.error = 'Player already exists';
      });
  }
});

export const { logout } = playerSlice.actions;

export default playerSlice;
