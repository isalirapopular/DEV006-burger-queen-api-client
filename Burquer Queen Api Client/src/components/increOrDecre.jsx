import React, { useState } from 'react';

const QuantityComponent = ({ initialQuantity }) => {
   // const ItemQuantityComponent = ({ initialQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
  

    // Función para aumentar la cantidad
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Función para disminuir la cantidad
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div>
            <button onClick={increaseQuantity}>Aumentar</button>
            <p>{quantity}</p>
            <button onClick={decreaseQuantity}>Disminuir</button>
        </div>
    );
};

export default QuantityComponent;