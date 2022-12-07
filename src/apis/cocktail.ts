import axios from "axios";

export const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";

export const api = axios.create({
  baseURL,
});
