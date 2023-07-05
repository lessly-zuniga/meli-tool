import axios from 'axios';
import { firestore } from '../firebaseConfig';

const BOT_PREFIX: string = process.env.REACT_APP_GET_PRODUCTS_RAPIDAPI_API!;
const KEY: string = process.env.REACT_APP_RAPIDAPI_KEY!;
const HOST: string = process.env.REACT_APP_RAPIDAPI_HOST!;

interface FirebaseProduct {
  asin: string;
  product_name: string;
  current_price: number;
  is_prime: boolean;
  image_url: string;
  locale: string;
  currency_symbol: string;
}

interface FirebaseData {
  country: string;
  currency: string;
  products: FirebaseProduct[];
  status: string;
  timestamp: any;
}


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

export const fetchFirebaseProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    const docRef = firestore.collection('products').doc('productData');
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data() as FirebaseData;
      return data.products;
    } else {
      console.error('El documento "productsData" no existe en la colección "products".');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener los productos de Firebase:', error);
    return [];
  }
};
