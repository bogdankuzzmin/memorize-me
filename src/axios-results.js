import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://memorize-me-855cf-default-rtdb.firebaseio.com/'
});

export default instance;