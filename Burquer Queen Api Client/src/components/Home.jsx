import { useState, useEffect } from "react";
import { products } from "./GetApi.js"
import { ProductFilter } from './ProductFilter';

export function Home({user, setUser}) {
    const [productsData, setProductsData] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);

    function getProducts() {
        console.log(user.token);
        products(user.token)
        .then((data) => {
          console.log('acá se filtra', setFilteredProducts);
          setProductsData(data);
          setFilteredProducts(data);
        })
        .catch((error) => {
          console.error("Error al obtener los productos:", error); // Muestra cualquier error en la consola
        });
    }
  
    const handleLogout = () => {
      setUser(null);
    };
  
    useEffect(() => {
      getProducts();
    }, [user.token]);
    return(
        <div>
            <button>Desayuno</button>
            <button>Almuerzo</button>
            <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} ${product.price}
          </li>
        ))}
          </ul>
      <ProductFilter productsData={productsData} setFilteredProducts={setFilteredProducts} />
            
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    );
}