import { AxiosResponse } from 'axios';
import api from './api';
import { Player } from '../models/reduxModels';

export default {
  async createPlayer(name: string): Promise<Player> {
    const response: AxiosResponse<Player> = await api()
      .get(`players/${name}`);

    return response.data;
  },
  async getAllPlayers(): Promise<Player[]> {
    const response: AxiosResponse<Player[]> = await api()
      .get('players');

    return response.data;
  }
};
