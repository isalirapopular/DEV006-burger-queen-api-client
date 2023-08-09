import React, { useState, useEffect } from "react";
import { products, getUserDetails } from "./GetApi.js";
import { ProductFilter } from "./ProductFilter.jsx";
import SelectedProducts from "./SelectedProducts.jsx";
import QuantityComponent from "./increOrDecre.jsx";

import "./Home.css";

export function Home({ user, setUser }) {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [orderName, setOrderName] = useState("");
  const [clientId, setClientId] = useState([]);
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

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

  function fetchUserDetails(token, userEmail) {
    getUserDetails(token, userEmail)
      .then((data) => {
        console.log("User Details:", data); 
        setUserDetails(data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del usuario:', error);
      });
  }
  
  useEffect(() => {
    getProducts();
    console.log("Token:", user.token);
  console.log("User Email:", user.user.email);
    fetchUserDetails(user.token, user.user.id); // Pasar el correo electrónico del usuario logueado
  }, []);

  const handleButtonClick = (product) => {
    const newProduct = {
      ...product,
      orderName: orderName,
      clientId: clientId,
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

  
  const handleMakeOrder = async () => {
      try {
        if (userDetails && userDetails.id) { 
          const order = {
          userId: userDetails.id,
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
        status: "pending",
        dateEntry: new Date().toISOString(),
      };

      console.log("Orden realizada:", order);
      setSelectedProducts([]);
    } else {
      console.error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al realizar el pedido:", error);
  }
};
  return (
    <div className="main">
      <header className="navHome">
        <div className="userEmail">
          {user && <p>Hola {user.user.email}</p>}
        </div>
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
