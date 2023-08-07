import { useState, useEffect } from "react";
import { products, getClients } from "./GetApi.js"
import { ProductFilter } from "./ProductFilter.jsx";
import SelectedProducts from "./SelectedProducts.jsx"
import QuantityComponent from "./increOrDecre.jsx"

import './Home.css'

export function Home({ user, setUser }) {
  const [productsData, setProductsData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]); // Agrega el estado para los productos filtrados
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [orderName, setOrderName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);

const generateOrderId = (() => {
    let counter = 1; // Variable para llevar el seguimiento de los IDs
    return () => counter++;
  })();
  
function getProducts() {
    console.log(products)
    products(user.token)
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
      }).catch(console.error);
      getClients(user.token)
    .then((clientsData) => {
      setClients(clientsData);
    })
    .catch(console.error);
}
  

const handleLogout = () => {
    setUser(null)
  }
  useEffect(() => {
    getProducts()
  }, [])

const handleButtonClick = (product) => {
    const newProduct = {
      ...product,
      orderName: orderName,
      clientId: clientId,
      orderId: generateOrderId()
    };
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, newProduct]);
    setOrders((prevOrders) => [...prevOrders, newProduct]);
};
const handleMakeOrder = () => {
  console.log("Pedidos realizados:", orders);
  setSelectedProducts([]); // Limpiar la lista de productos seleccionados
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

  <div className="orderForm">
    <input
      type="text"
      placeholder="Nombre del Pedido"
      value={orderName}
      onChange={(e) => setOrderName(e.target.value)}
    />
    
  
      
    <section className="sectionBody">
        {/* Reemplaza la sección "sectionProductos" con el componente "SelectedProducts" */}
        <SelectedProducts
          filteredProducts={filteredProducts}
          handleButtonClick={handleButtonClick}
     />
    </section>
</div>

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
            <p>Nombre del Pedido: {product.orderName}</p>
            <p>ID del Cliente: {product.clientId}</p>
            <p>ID del Pedido: {product.orderId}</p>
          </div>
        ))}
      </div>
      
      </section>
      <button onClick={() => handleMakeOrder()}>Hacer pedido</button>
    </div>

  );
}