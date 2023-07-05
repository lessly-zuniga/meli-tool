import { AmazonAction, SET_AMAZON_ERROR, SET_AMAZON_PRODUCTS } from '../types/amazonTypes';

interface AmazonState {
  products: any[];
  error: string;
}

const initialState: AmazonState = {
  products: [],
  error: ''
};

const amazonReducer = (state = initialState, action: AmazonAction): AmazonState => {
  switch (action.type) {
    case SET_AMAZON_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case SET_AMAZON_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default amazonReducer;
