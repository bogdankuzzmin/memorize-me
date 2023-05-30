import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://memorize-me-b6f71-default-rtdb.firebaseio.com/'
});

export default instance;