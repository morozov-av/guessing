import { SPEED_STORAGE_KEY } from '../constants';
import { storage } from '../helpers/localStorage';
import { RoundState } from '../models/reduxModels';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RoundService from '../service/round/roundService';
import { Bid, BidOrMultiplier } from '../types';

const currentSpeed: number | null = storage.get(SPEED_STORAGE_KEY);
const initialRoundState: RoundState = {
  id: null,
  speed: currentSpeed || 6,
  inProgress: true,
  bid: 0,
  multiplier: 0
};

export const createBid = createAsyncThunk('bids/createBid', async (bid: Bid) => {
  await RoundService.createBid(bid);
});

const roundSlice = createSlice({
  name: 'round',
  initialState: initialRoundState,
  reducers: {
    setRoundId(state, action: { payload: { id: string, inProgress: boolean } } ) {
      state.id = action.payload.id;
      state.inProgress = action.payload.inProgress;
    },
    setRoundProgress(state, action: { payload: { inProgress: boolean } } ) {
      state.inProgress = action.payload.inProgress;
    },
    setMultiplierSpeed(state, action: { payload: { speed: number } } ) {
      storage.set(SPEED_STORAGE_KEY, action.payload.speed);
      state.speed = action.payload.speed;
    },
    setBidOrMultiplier(state, action: { payload: { type: BidOrMultiplier, value: number } } ) {
      const { type, value } = action.payload;
      state[type] = value;
    }
  },
  extraReducers: builder => {
    builder.addCase(createBid.fulfilled, (state) => {
      state.inProgress = true;
    });
  }
});

export const {
  setRoundId,
  setMultiplierSpeed,
  setRoundProgress,
  setBidOrMultiplier
} = roundSlice.actions;

export default roundSlice;
