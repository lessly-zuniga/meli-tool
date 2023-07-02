import axios, { AxiosInstance } from 'axios';

export const amazon_api: AxiosInstance = axios.create({
  baseURL: process.env.GET_PRODUCTS_RAPIDAPI_API,
  headers: {
    'Access-Control-Allow-Origin': 'true'
  }
});
