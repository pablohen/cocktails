import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://www.thecocktaildb.com/api/json/v1/1';

export const cocktailService = axios.create({
  baseURL: API_URL,
});
