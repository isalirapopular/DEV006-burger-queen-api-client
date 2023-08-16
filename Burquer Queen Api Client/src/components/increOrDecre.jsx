import React, { useState } from 'react';
import './increOrDecre.css'

const QuantityComponent = ( {initialQuantity, product,  selectedProducts, setSelectedProducts}) => {
   
    const [quantity, setQuantity] = useState(initialQuantity);


    // Función para aumentar la cantidad
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        const newProduct2 = selectedProducts.map(producto => producto.id === product.id ?{...producto, qty:quantity + 1} : producto)
        console.log(newProduct2)
        setSelectedProducts(newProduct2)
    };

    // Función para disminuir la cantidad
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            const newProduct2 = selectedProducts.map(producto => producto.id === product.id ?{...producto, qty:quantity - 1} : producto)
        console.log(newProduct2)
        setSelectedProducts(newProduct2)
        }
    };

    return (
        <div className='divIncreOrDecre'>
            <button className='buttonMore' onClick={increaseQuantity}>+</button>
            <p>{quantity}</p>
            <button  className='buttonLess' onClick={decreaseQuantity}>-</button>
        </div>
    );
};

export default QuantityComponent;