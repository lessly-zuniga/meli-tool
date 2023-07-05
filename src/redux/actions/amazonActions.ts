import { Dispatch } from 'redux';
import { fetchAmazonData } from '../../services/amazonApi';
import { AmazonAction, SET_AMAZON_ERROR, SET_AMAZON_PRODUCTS } from '../types/amazonTypes';

export const fetchAmazonProductInfo = (asinList: string[]) => {
  console.log(asinList, 'asinList');
  return async (dispatch: Dispatch<AmazonAction>) => {
    try {
      const response = await fetchAmazonData(asinList);
      console.log(response, 'response');
      // Verificar si la respuesta es un array válido
      if (Array.isArray(response) && response.length > 0) {
        // Dispatch de la acción exitosa con la respuesta
        dispatch({ type: SET_AMAZON_PRODUCTS, payload: response });
      } else {
        // Dispatch de la acción de error si la respuesta no es válida
        dispatch({
          type: SET_AMAZON_ERROR,
          payload: 'La respuesta de Amazon no contiene datos válidos.'
        });
      }
      return response;
    } catch (error: any) {
      // Dispatch de la acción de error
      dispatch({ type: SET_AMAZON_ERROR, payload: error.message });
      return error;
    }
  };
};
