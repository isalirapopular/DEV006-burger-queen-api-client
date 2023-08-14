import React, { useState } from "react";
import './Home.css';

export function ProductFilter({ productsData, setFilteredProducts }) {
  
    const handleTypeChange = (type) => {
      filterProducts(type);
    };
  
    const filterProducts = (type) => {
        console.log('Filtrando por tipo:', type);
      if (type === '') {
        console.log('Mostrando todos los productos');
        setFilteredProducts(productsData);
      } else {
        const filteredProducts = productsData.filter((product) => product.type === type);
        console.log('Productos filtrados:', setFilteredProducts);
        setFilteredProducts(filteredProducts);
      }
    };
  
    return (
      <div className="filterButtonsContainer">
        <button className="buttonTodos" onClick={() => handleTypeChange('')}>Todos</button>
          <button  className="buttonDesayuno" onClick={() => handleTypeChange('Desayuno')}>Desayuno</button>
          <button  className="buttonAlmuerzo" onClick={() => handleTypeChange('Almuerzo')}>Almuerzo</button>
          {/* Agrega aquí más opciones de tipo según tus necesidades */}
      </div>
    );
  }