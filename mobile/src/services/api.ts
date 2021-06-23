import { AsyncStorage } from 'react-native'
import axios from 'axios';
import config from '../config/pointvalues.json'

const api = axios.create({
  baseURL: `http://${config.api}`
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@XploreApp:token');
  if (token) {

    // const userToken = await AsyncStorage.getItem('userToken');
    const userToken = token;
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config
}, (error) => {
  return Promise.reject(error);
});

export default api;