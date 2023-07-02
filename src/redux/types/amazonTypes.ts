export enum AmazonActionTypes {
    SET_AMAZON_PRODUCTS = 'SET_AMAZON_PRODUCTS',
    SET_AMAZON_ERROR = 'SET_AMAZON_ERROR',
  }
  
  interface SetAmazonProductsAction {
    type: AmazonActionTypes.SET_AMAZON_PRODUCTS;
    payload: any; // Define el tipo de los datos de los productos de Amazon
  }
  
  interface SetAmazonErrorAction {
    type: AmazonActionTypes.SET_AMAZON_ERROR;
    payload: string; // Define el tipo del mensaje de error
  }
  
  export type AmazonAction = SetAmazonProductsAction | SetAmazonErrorAction;
  