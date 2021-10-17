import axios from 'axios';

const cocktailService = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});

export default cocktailService;
