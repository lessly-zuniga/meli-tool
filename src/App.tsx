import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductListController from './pages/app/productList/ProductListController';

const App = () => (
  <Provider store={store}>
    <ProductListController />
  </Provider>
);

export default App;
