import React, { useState } from 'react';
import ProductList from '../../../components/productList/ProductList';

interface ProductListScreenProps {
  handleUpdateAmazonResponse: (response: any) => void;
}

const mockData = [{
  asin: ' B01N1QP1C3',
  product_name: 'Arctic Ruby Oil Omega-3 with Astaxanthin',
  current_price: 32.7,
  is_prime: true,
  image_url: 'https://m.media-amazon.com/images/I/41g+d-pNZEL.jpg',
  locale: 'US',
  currency_symbol: '$'
}, {
  asin: 'B0BYK7Q7CW',
  // eslint-disable-next-line max-len
  product_name: 'Bold Botanica Bold Plant Omega 3-6-9 – with Ahiflower Oil – Complete Plant-Based Omegas – No Fish, Great Taste, Sugar-Free, Vegan, Non-GMO- Liquid- 4 oz',
  current_price: 24.99,
  is_prime: true,
  image_url: 'https://m.media-amazon.com/images/I/41owVvkOVGL.jpg',
  locale: 'US',
  currency_symbol: '$'
}];

const ProductListScreen = ({ handleUpdateAmazonResponse }: ProductListScreenProps) => {
  // const [asinList, setAsinList] = useState<string[]>([]);
  const [amazonproducts, setAmazonProducts] = useState<any[]>(mockData);

  const handleFormSubmit = () => {
    // event.preventDefault();
    //   dispatch(fetchAmazonProductInfo(asinList))
    //     .then((response) => {
    //       // handleAmazonResponse(response);
    //       setAmazonProducts(response)
    setAmazonProducts(mockData);
    handleUpdateAmazonResponse(mockData);
    console.log(amazonproducts, 'amazonproducts');
  //     })
  //     .catch((e) => {
  //       console.log('error:', e);
  //     });
  };

  // const handleInputChange = (event: React.ChangeEvent<{value: string}>) => {
  //   // const { value } = event.target;
  //   // setAsinList(value.split(','));
  // };

  console.log(amazonproducts, 'amazonproducts');
  return (
    <div style={{ padding: '5%' }}>
      {/* <form onSubmit={handleFormSubmit}>
        <input type="text" onChange={handleInputChange} /> */}

      {/* </form> */}

      <ProductList handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProductListScreen;
