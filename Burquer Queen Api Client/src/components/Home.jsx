import { useState, useEffect } from "react";
import { products } from "./GetApi.js"

export function Home({user, setUser}) {
    const [productsData, setProductsData] = useState([])

    function getProducts() {
        console.log(user.token);
        products(user.token)
        .then((data) => {
          setProductsData(data);
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
            {productsData.map((product) => (
               <li key={product.id}>{product.name} ${product.price}</li>
               ))}
            
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    );
}