import { useState, useEffect } from "react"
import { products } from "../GetApi"

export function Home({user, setUser}) {
    const [products, setProducts] = useState([])

    function getProducts() {
        console.log(products)
        products(user.token)
        .then((data) =>{
            setProducts(data)
        }).catch(console.error)
    }

    const handleLogout=()=>{
        setUser([])
    }
    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user}</h2>
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    )
}