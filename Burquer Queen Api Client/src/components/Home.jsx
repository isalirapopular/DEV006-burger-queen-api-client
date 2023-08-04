import { useState, useEffect } from "react";
import { products } from "./GetApi.js"
import { ProductFilter } from "./ProductFilter.jsx";
import SelectedProducts from "./SelectedProducts.jsx"
import QuantityComponent from "./increOrDecre.jsx"

import './Home.css'

export function Home({ user, setUser }) {
  const [productsData, setProductsData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]); // Agrega el estado para los productos filtrados
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  function getProducts() {
    console.log(products)
    products(user.token)
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
      }).catch(console.error)
  }

  const handleLogout = () => {
    setUser(null)
  }
  useEffect(() => {
    getProducts()
  }, [])

  const handleButtonClick = (product) => {
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
  };

  const handleDeleteButtonClick = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((item) => item.id !== product.id)
    );
  };
  return (
    <div className="main">
      <header className="navHome">
        <button className="buttonCerrarSeccion" onClick={handleLogout}>
          Cerrar Sesion
        </button>
        <ProductFilter
          productsData={productsData}
          setFilteredProducts={setFilteredProducts}
        />
      </header>
      <section className="sectionBody">
        {/* Reemplaza la sección "sectionProductos" con el componente "SelectedProducts" */}
        <SelectedProducts
          filteredProducts={filteredProducts}
          handleButtonClick={handleButtonClick}
        />

</section>
    <section>
    <div className="tikect">
        <h2>Productos seleccionados:</h2>
        {selectedProducts.map((product) => (
          <div className="selectedProducts" key={product.id}>
            {product.name} ${product.price}
            <QuantityComponent initialQuantity={quantity} />
            <button onClick={() => handleDeleteButtonClick(product)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}