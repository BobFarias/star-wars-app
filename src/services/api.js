import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://swapi.co/api/',
});

export default api;
