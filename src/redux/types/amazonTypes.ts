export const SET_AMAZON_PRODUCTS = 'SET_AMAZON_PRODUCTS';
export const SET_AMAZON_ERROR = 'SET_AMAZON_ERROR';

  interface SetAmazonProductsAction {
    type: typeof SET_AMAZON_PRODUCTS;
    payload: any;
  }

  interface SetAmazonErrorAction {
    type: typeof SET_AMAZON_ERROR;
    payload: any;
  }

export type AmazonAction = SetAmazonProductsAction | SetAmazonErrorAction;
