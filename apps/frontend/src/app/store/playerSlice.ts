import { PLAYER_STORAGE_KEY } from '../constants';
import { storage } from '../helpers/localStorage';
import { Player, PlayerState } from '../models/reduxModels';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import PlayerService from '../service/playerService';
import { RootState } from './index';

export const createPlayer = createAsyncThunk('player/createPlayer', async (name: string) => {
  const player: Player = await PlayerService.createPlayer(name);
  return player;
});

export const getAllPlayers = createAsyncThunk('player/getAllPlayers', async () => {
  const players: Player[] = await PlayerService.getAllPlayers();
  return players;
});

const currentPlayer: string | null = storage.get(PLAYER_STORAGE_KEY);
const initialPlayer: Player = {
  status: null,
  id: null,
  playerName: currentPlayer,
  points: null
};

const initialPlayerState: PlayerState = {
  currentPlayer: initialPlayer,
  allPlayers: {
    status: null,
    players: []
  }
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    logout(state) {
      state.currentPlayer = {
        ...initialPlayer,
        playerName: null
      };
      storage.set(PLAYER_STORAGE_KEY, null);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createPlayer.pending, (state) => {
        state.currentPlayer.status = 'loading';
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        const { id, playerName, points } = action.payload ;
        storage.set(PLAYER_STORAGE_KEY, playerName);
        state.currentPlayer = {
          status:'idle',
          playerName ,
          id,
          points
        };
      })
      .addCase(createPlayer.rejected, (state) => {
        state.currentPlayer.status = 'idle';
      })
      .addCase(getAllPlayers.pending, (state) => {
        state.allPlayers.status = 'loading';
      })
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.allPlayers = {
          status:'idle',
          players: action.payload
        };
      })
      .addCase(getAllPlayers.rejected, (state) => {
        state.allPlayers.status = 'idle';
      });
  }
});

export const getAreInputsDisabled = createSelector(
  (state: RootState) => state.player,
  (state) => !state.currentPlayer.playerName
);


export const { logout } = playerSlice.actions;

export default playerSlice;
