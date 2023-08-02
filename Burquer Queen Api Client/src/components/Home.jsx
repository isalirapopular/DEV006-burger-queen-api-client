import { useState, useEffect } from "react";
import { products } from "./GetApi.js"
import { ProductFilter } from "./ProductFilter.jsx";

export function Home({user, setUser}) {
    const [productsData, setProductsData] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]); // Agrega el estado para los productos filtrados
   
    function getProducts() {
        console.log(products)
        products(user.token)
        .then((data) =>{
            setProductsData(data);
            setFilteredProducts(data);
        }).catch(console.error)
    }

    const handleLogout=()=>{
        setUser(null)
    }
    useEffect(() => {
        getProducts()
    }, [])
    ;
    return(
      <div>
      <ProductFilter productsData={productsData} setFilteredProducts={setFilteredProducts} />
      {filteredProducts.map((product) => (
        <button key={product.id}>
          {product.name} ${product.price}
        </button>
      ))}
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </div>
    );
}