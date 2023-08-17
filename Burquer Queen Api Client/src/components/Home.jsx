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
      qty: quantity,
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
            qty: product.quantity || 1,
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

  const priceQuantity = (product) => {
    console.log(product)
    return product.price * product.qty;
  }

  const priceTotal = () => {
    console.log(priceTotal, 'acá el total')
    return selectedProducts.reduce((total, product) => total + priceQuantity(product), 0)

  }




  return (
    <div className="main">
      <header className="navHome">
        <img className="logoHeader" src="https://onedrive.live.com/embed?resid=5f2497285b7b79a0%21121282&authkey=%21ABZyNQn6tW6Ny3w&width=330&height=511" alt="BurguerQueenLogo" />
        <div className="userEmail">
          {user && <p>Hola {user.user.email}</p>}
        </div>
        <ProductFilter
          productsData={productsData}
          setFilteredProducts={setFilteredProducts}
        />
        <button className="buttonCerrarSesion" onClick={handleLogout}
        style={{ outline: 'none', border: 'none', background: 'transparent', padding: 0 }}
        >
        <img style={{ width: 56, height: 56  }} src="../src/assets/logout.png" alt="delete" />
        
          
        </button>
      </header>



      <section className="sectionBody">

        <section className="productSelect">
          <SelectedProducts
            filteredProducts={filteredProducts}
            handleButtonClick={handleButtonClick}
          />
        </section>


        <div className="tikect">
          <div className="orderForm">
           
          </div>
          <h2 className="ticketTitle">DETALLES DEL PEDIDO</h2>
          <input className="imputOrderName"
              type="text"
              placeholder="Nombre del Pedido"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
            />
          {selectedProducts.map((product) => (
            <div className="selectedProducts" key={product.id}>
              {product.name} ${product.price}
              <QuantityComponent
                initialQuantity={product.qty}
                product={product}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts} />
              <p>Total: ${priceQuantity(product)}</p>
              <button onClick={() => handleDeleteButtonClick(product)}
              style={{ outline: 'none', border: 'none', background: 'transparent', padding: 0 }}
              >
                <img style={{ width: 20, height: 25 }} src="../src/assets/trash.svg" alt="delete" />
               </button>
            </div>
          ))}
          <footer className="totalFooter">
          <p className="totalTitle">Total</p>
          <p className="totalNumber"> $:{priceTotal()}</p>
          </footer>
          <button className="buttonHacerPedido" onClick={handleMakeOrder}>Enviar pedido</button>
        </div>
      </section>



    </div>
  );
}
