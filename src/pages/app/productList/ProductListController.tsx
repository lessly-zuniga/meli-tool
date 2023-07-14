import React, { useEffect, useState } from 'react';
import ProductListScreen from './ProductListScreen';
import { fetchFirebaseProducts, setFirebaseData, updateFirebaseProducts } from '../../../services/amazonApi';

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await fetchFirebaseProducts();
    setFirebaseProducts(products);
  };

  const filterValidProducts = (response: AmazonProduct[]) => response.filter((product) => product?.asin?.trim() !== '');

  const handleUpdateAmazonResponse = async (response: AmazonProduct[]): Promise<void> => {
    try {
      const validProducts = filterValidProducts(response);

      if (firebaseProducts.length > 0) {
        const updatedProducts = firebaseProducts.map((existingProduct) => {
          const matchingProduct = validProducts.find((product) => product.asin === existingProduct.asin);

          if (matchingProduct && existingProduct.current_price !== matchingProduct.current_price) {
            return { ...existingProduct, current_price: matchingProduct.current_price };
          }
          return existingProduct;
        });

        await updateFirebaseProducts(updatedProducts);
      } else {
        const firebaseData: FirebaseData = {
          country: 'US',
          currency: '$',
          products: validProducts,
          status: 'active',
          timestamp: new Date()
        };

        await setFirebaseData(firebaseData);
      }
    } catch (error) {
      console.error('Error al actualizar o guardar los datos en Firebase:', error);
    }
  };

  return <ProductListScreen handleUpdateAmazonResponse={handleUpdateAmazonResponse} />;
};

export default ProductListController;
