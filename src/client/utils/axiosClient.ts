import axios from 'axios';
import { parseErrorMessage } from './parseErrorMessage';

const apiClient = axios.create({
  baseURL: '/api'
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const parsedMessage = parseErrorMessage(error);
    return Promise.reject(new Error(parsedMessage));
  }
);

export default apiClient;
