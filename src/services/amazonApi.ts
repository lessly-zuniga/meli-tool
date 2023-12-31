import axios from 'axios';
import { firestore } from '../firebaseConfig';
import { FirebaseData, FirebaseProduct } from './types';

const BOT_PREFIX: string = process.env.REACT_APP_GET_PRODUCTS_RAPIDAPI_API!;
const KEY: string = process.env.REACT_APP_RAPIDAPI_KEY!;
const HOST: string = process.env.REACT_APP_RAPIDAPI_HOST!;

export const fetchFirebaseProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    const docRef = firestore.collection('products').doc('productData');
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      const data = docSnapshot.data() as FirebaseData;
      return data.products;
    }
    console.error('El documento "productsData" no existe en la colección "products".');
    return [];
  } catch (error) {
    console.error('Error al obtener los productos de Firebase:', error);
    return [];
  }
};

export const setFirebaseData = async (firebaseData: FirebaseData) => {
  try {
    await firestore
      .collection('products')
      .doc('productData')
      .set(firebaseData);

    console.log('Datos guardados en Firebase con set');
  } catch (error) {
    console.error('Error al guardar los datos en Firebase:', error);
    throw error;
  }
};

export const updateFirebaseProducts = async (updatedProducts: FirebaseProduct[]) => {
  try {
    await firestore
      .collection('products')
      .doc('productData')
      .update({ products: updatedProducts });

    console.log('Datos actualizados en Firebase con update');
  } catch (error) {
    console.error('Error al actualizar los datos en Firebase:', error);
    throw error;
  }
};

export const fetchAmazonData = async (asinList: string[]) => {
  try {
    const response = await axios.get(BOT_PREFIX, {
      params: {
        asins: asinList.join(','),
        locale: 'US'
      },
      headers: {
        'X-RapidAPI-Key': KEY,
        'X-RapidAPI-Host': HOST
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Amazon data');
  }
};
