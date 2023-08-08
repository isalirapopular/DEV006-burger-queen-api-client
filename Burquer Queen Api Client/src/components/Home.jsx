import React, { useState, useEffect } from "react";
import { products } from "./GetApi.js";
import { ProductFilter } from "./ProductFilter.jsx";
import SelectedProducts from "./SelectedProducts.jsx";
import QuantityComponent from "./increOrDecre.jsx";

import './Home.css';

export function Home({ user, setUser }) {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
    products(user.token)
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
      })
      .catch(console.error);
  }

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleButtonClick = (product) => {
    const newProduct = {
      ...product,
      orderName: orderName,
      clientId: clientId,
      orderId: generateOrderId(),
    };
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      newProduct,
    ]);
  };

  const handleDeleteButtonClick = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((item) => item.id !== product.id)
    );
  };

  const handleMakeOrder = () => {
    if (selectedProducts.length === 0) {
      console.log("No hay productos seleccionados para hacer el pedido.");
      return;
    }
    
    const order = {
      userId: user.id,
      client: orderName,
      products: selectedProducts.map((product) => ({
        qty: product.qty,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          type: product.type,
          dateEntry: product.dateEntry,
        },
      })),
    };

    console.log("Orden realizada:", order);
    setSelectedProducts([]);
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
      </div>

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
              <p>Nombre del Pedido: {product.orderName}</p>
              <p>ID del Cliente: {product.clientId}</p>
              <p>ID del Pedido: {product.orderId}</p>
            </div>
          ))}
        </div>
      </section>
      
      <button onClick={handleMakeOrder}>Hacer pedido</button>
    </div>
  );
}
