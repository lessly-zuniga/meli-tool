import React, { useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { fetchAmazonProductInfo } from '../../../redux/actions/amazonActions';
import { firestore } from '../../../firebaseConfig';
import { AmazonAction } from '../../../redux/types/amazonTypes';
import RootState from '../../../redux/store';

const ProductListScreen = () => {
  const dispatch: ThunkDispatch<typeof RootState, null, AmazonAction> = useDispatch();
  const [asinList, setAsinList] = useState<string[]>([]);

  const handleAmazonResponse = (response: any) => {
    if (response && Array.isArray(response) && response.length > 0) {
      const validProducts = response.filter((product: any) => product && product.asin && product.asin.trim() !== '');
  
      if (validProducts.length > 0) {
        const formattedProducts = validProducts.map((product: any) => ({
          asin: product.asin.trim(),
          product_name: product.product_name,
          current_price: product.current_price,
          is_prime: product.is_prime,
          image_url: product.image_url,
          locale: product.locale,
          currency_symbol: product.currency_symbol,
        }));
  
        // Preparar los datos a enviar a Firebase
        const productsData = {
          timestamp: new Date(),
          currency: formattedProducts[0].currency_symbol,
          country: formattedProducts[0].locale,
          status: 'active',
          products: formattedProducts,
        };
  
        // Enviar los datos a Firebase
        firestore
          .collection('products')
          .add(productsData)
          .then(() => {
            console.log('Datos enviados a Firebase correctamente.');
          })
          .catch((error: Error) => {
            console.error('Error al enviar los datos a Firebase:', error);
          });
      } else {
        console.error('La respuesta de Amazon no contiene datos válidos.');
      }
    } else {
      console.error('La respuesta de Amazon es incorrecta o vacía.');
    }
  };
  

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchAmazonProductInfo(asinList))
      .then((response) => {
        handleAmazonResponse(response);
      })
      .catch((e) => {
        console.log('error:', e);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAsinList(value.split(','));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" onChange={handleInputChange} />
        <button type="submit">Get Products</button>
      </form>
    </div>
  );
};

export default ProductListScreen;
