import React, { useEffect, useState } from 'react';
import ProductListScreen from './ProductListScreen';
import { firestore } from '../../../firebaseConfig';
import { fetchFirebaseProducts } from '../../../services/amazonApi';

interface AmazonProduct {
  asin: string;
  product_name: string;
  current_price: number;
  is_prime: boolean;
  image_url: string;
  locale: string;
  currency_symbol: string;
}

interface FirebaseProduct extends AmazonProduct {}

interface FirebaseData {
  country: string;
  currency: string;
  products: FirebaseProduct[];
  status: string;
  timestamp: any;
}

const ProductListController: React.FC = () => {
  const [firebaseProducts, setFirebaseProducts] = useState<FirebaseProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchFirebaseProducts();
      setFirebaseProducts(products);
    };

    fetchProducts();
  }, []);

  const filterValidProducts = (response: AmazonProduct[]) => response.filter((product) => product?.asin?.trim() !== '');

  const updateProductInFirebase = (
    existingProduct: FirebaseProduct,
    newProduct: FirebaseProduct
  ): FirebaseProduct => {
    if (
      newProduct
      && existingProduct.current_price !== newProduct.current_price
      && typeof newProduct.current_price === 'number'
    ) {
      const updatedProduct = {
        ...existingProduct,
        current_price: newProduct.current_price
      };

      firestore
        .collection('products')
        .doc('productData')
        .update({
          products: { ...newProduct, current_price: newProduct.current_price }
        })
        .then(() => {
          console.log(`Producto actualizado en Firebase: ASIN ${existingProduct.asin}`);
        })
        .catch((error: Error) => {
          console.error('Error al actualizar el producto en Firebase:', error);
        });

      return updatedProduct;
    }

    return existingProduct;
  };

  const handleUpdateAmazonResponse = (response: AmazonProduct): void => {
    if (Array.isArray(response) && response.length > 0) {
      const AmazonProducts = filterValidProducts(response).sort();
      if (AmazonProducts.length > 0) {
        const formattedProducts = AmazonProducts;

        const updatedProducts = Object.values(firebaseProducts).map((existingProduct) => {
          const sameProductAsin = formattedProducts.find((product) => product.asin === existingProduct.asin);
          if (sameProductAsin && existingProduct.current_price !== sameProductAsin.current_price) {
            return updateProductInFirebase(existingProduct, sameProductAsin);
          }
          return existingProduct;
        });

        const firebaseData: FirebaseData = {
          country: 'US',
          currency: '$',
          products: updatedProducts,
          status: 'active',
          timestamp: new Date()
        };

        firestore
          .collection('products')
          .doc('productData')
          .set(firebaseData)
          .then(() => {
            console.log('Datos actualizados en Firebase');
          })
          .catch((error: Error) => {
            console.error('Error al actualizar los datos en Firebase:', error);
          });
      } else {
        console.error('La respuesta de Amazon no contiene datos válidos.');
      }
    } else {
      console.error('La respuesta de Amazon es incorrecta o vacía.');
    }
  };

  return <ProductListScreen handleUpdateAmazonResponse={handleUpdateAmazonResponse} />;
};

export default ProductListController;
