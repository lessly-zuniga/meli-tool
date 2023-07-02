import axios from 'axios';

const BOT_PREFIX: string = process.env.REACT_APP_GET_PRODUCTS_RAPIDAPI_API!;
const KEY: string = process.env.REACT_APP_RAPIDAPI_KEY!;
const HOST: string = process.env.REACT_APP_RAPIDAPI_HOST!;

export const fetchAmazonData = async (asinList: string[]) => {
  try {
    const response = await axios.get(BOT_PREFIX, {
      params: {
        asins: asinList.join(','),
        locale: 'US',
      },
      headers: {
        'X-RapidAPI-Key': KEY,
        'X-RapidAPI-Host': HOST,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Amazon data');
  }
};
