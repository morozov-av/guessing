import { SPEED_STORAGE_KEY } from '../constants';
import { storage } from '../helpers/localStorage';
import { RoundState } from '../models/reduxModels';
import { createSlice } from '@reduxjs/toolkit';
import { Bid, BidOrMultiplier } from '../types';

const currentSpeed: number | null = storage.get(SPEED_STORAGE_KEY);
const initialRoundState: RoundState = {
  id: null,
  speed: currentSpeed || 6,
  inProgress: true,
  bid: 100,
  multiplier: 1,
  bids: []
};

const roundSlice = createSlice({
  name: 'round',
  initialState: initialRoundState,
  reducers: {
    setRoundId(state, action: { payload: { id: string, inProgress: boolean } } ) {
      state.id = action.payload.id;
      state.inProgress = action.payload.inProgress;
      state.bids = initialRoundState.bids;
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
    },
    saveBid(state, action: { payload: { bid: Bid } } ) {
      if (action.payload.bid.roundId === state.id) {
        state.bids.push(action.payload.bid);
        state.bids.sort((a, b) => b.amount - a.amount);
      }
    }
  }
});

export const {
  setRoundId,
  setMultiplierSpeed,
  setRoundProgress,
  setBidOrMultiplier,
  saveBid
} = roundSlice.actions;

export default roundSlice;
