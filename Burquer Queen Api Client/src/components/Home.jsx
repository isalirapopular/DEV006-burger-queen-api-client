import { useState, useEffect } from "react";
import { products } from "./GetApi.js"
import { ProductFilter } from "./ProductFilter.jsx";
import './Home.css'

export function Home({ user, setUser }) {
  const [productsData, setProductsData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]); // Agrega el estado para los productos filtrados
  const [SelectedProducts, setSelectedProducts] = useState([]);
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
    setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, product]);
  };
  return (
    <div className="main">
      <header className="navHome">
        <button className='buttonCerrarSeccion' onClick={handleLogout}>Cerrar Sesion</button>
        <ProductFilter productsData={productsData} setFilteredProducts={setFilteredProducts} />
      </header>
      <section className="sectionProductos">
        {filteredProducts.map((product) => (
          <button
            className='buttonProductos'
            key={product.id}
            onClick={() => handleButtonClick(product)}>
            {product.name} ${product.price}
          </button>
        ))}
      </section>
      <div className="selectedProducts">
        <h2>Productos seleccionados:</h2>
        {SelectedProducts.map((product) => (
          <div key={product.id}>
            {product.name} ${product.price}
          </div>
        ))}
      </div>
    </div>
  );
}