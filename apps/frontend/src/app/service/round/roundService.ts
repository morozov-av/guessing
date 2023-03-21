import { Bid } from '../../types';
import api from '../api';

export default {
  async createBid(bid: Bid): Promise<void> {
    await api()
      .post('bids/create', bid);
  }
};
