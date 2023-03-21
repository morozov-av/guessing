import axios from 'axios';
import { SERVER_URI } from '../constants';

export default () => {
  return axios.create({
    baseURL: `${SERVER_URI}/api`
  });
};
