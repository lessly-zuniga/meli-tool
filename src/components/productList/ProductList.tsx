import React, { useState, useEffect } from 'react';
import './ProductList.css';

interface Product {
  id: number;
  image: string;
  title: string;
  status: string;
  amazonPrice: number;
  meliPrice: number;
  profits: number;
}

interface Props {
  handleFormSubmit: (response: any) => void;
}

const productsPerPage = 1; // Número de productos por página

const ProductList = ({ handleFormSubmit }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log(handleFormSubmit, 'handleFormSubmit');

  useEffect(() => {
    // Simular una llamada a una API para obtener los datos de los productos
    fetchProducts();
  }, []);

  // Simulación de llamada a la API para obtener los productos
  const fetchProducts = () => {
    // Aquí puedes hacer la llamada a la API real o utilizar datos de prueba
    const dummyData: Product[] = [
      {
        id: 1,
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_787935-MLM50868348817_072022-P.webp',
        title: 'Producto 1',
        status: 'published',
        amazonPrice: 50,
        meliPrice: 60,
        profits: 10
      },
      {
        id: 2,
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_787935-MLM50868348817_072022-P.webp',
        title: 'Producto 2',
        status: 'error',
        amazonPrice: 30,
        meliPrice: 35,
        profits: 5
      },
      {
        id: 3,
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_958054-MLM53061277790_122022-P.webp',
        title: 'Producto 3',
        status: 'draft',
        amazonPrice: 20,
        meliPrice: 25,
        profits: 5
      }
      // Agrega más productos si es necesario
    ];

    setProducts(dummyData);
    setTotalPages(Math.ceil(dummyData.length / productsPerPage));
  };

  // Función para cambiar a la página anterior
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Función para cambiar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Filtrar los productos que corresponden a la página actual
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <div style={{ backgroundColor: '#FFFFFF', height: '4.5rem' }}>
              <th className="centered-content">
                Productos
              </th>
              <th className="centered-content">
                <button type="submit" className="custom-button" onClick={() => {}}>
                  Subir Productos
                </button>
              </th>
            </div>
          </tr>
        </thead>
        <thead>
          <tr style={{ backgroundColor: '#F9FAFB', height: '1rem' }}>
            <th className="centered-content">Producto</th>
            <th className="centered-content">Status</th>
            <th className="centered-content">Precio en Amazon</th>
            <th className="centered-content">Precio en Meli</th>
            <th className="centered-content">Ganancias</th>
            <th className="centered-content"> </th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td className="centered-content">
                <img src={product.image} alt={product.title} className="product-image" />
                <span className="centered-content">{product.title}</span>
              </td>
              <td className={`centered-content status-column ${product.status.toLowerCase()}`}>
                <span>{product.status}</span>
              </td>
              <td className="centered-content">{product.amazonPrice}</td>
              <td className="centered-content">{product.meliPrice}</td>
              <td className="centered-content">{product.profits}</td>
              <td className="centered-content">...</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          type="button"
          className={`pagination-btn${currentPage === 1 ? ' disabled' : ''}`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-page">
          <span className="pagination-page-number">{currentPage}</span>
        </span>
        <button
          type="button"
          className={`pagination-btn${currentPage === totalPages ? ' disabled' : ''}`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductList;
