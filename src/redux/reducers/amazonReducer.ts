import { AmazonActionTypes, AmazonAction } from '../types/amazonTypes';

interface AmazonState {
  products: any[]; // Aquí puedes especificar el tipo correcto para la matriz de productos
  error: string;
}

const initialState: AmazonState = {
  products: [],
  error: '',
};

const amazonReducer = (state = initialState, action: AmazonAction): AmazonState => {
  switch (action.type) {
    case AmazonActionTypes.SET_AMAZON_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: '',
      };
    case AmazonActionTypes.SET_AMAZON_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default amazonReducer;
