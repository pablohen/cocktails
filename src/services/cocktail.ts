import axios from 'axios';

export const cocktailService = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});
