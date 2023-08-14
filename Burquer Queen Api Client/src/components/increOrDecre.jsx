import React, { useState } from 'react';
import './Home.css';

const QuantityComponent = ({ initialQuantity }) => {
   
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
        <div className='divIncreOrDecre'>
            <button className='buttonMore' onClick={increaseQuantity}>+</button>
            <p>{quantity}</p>
            <button  className='buttonLess' onClick={decreaseQuantity}>-</button>
        </div>
    );
};

export default QuantityComponent;