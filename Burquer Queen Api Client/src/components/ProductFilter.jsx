import React, { useState } from "react";

export function ProductFilter({ productsData, setFilteredProducts }) {
    const [selectedType, setSelectedType] = useState('');
  
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
      filterProducts(event.target.value);
    };
  
    const filterProducts = (type) => {
        console.log('Filtrando por tipo:', type);
      if (type === '') {
        console.log('Mostrando todos los productos');
        setFilteredProducts(productsData);
      } else {
        const filteredProducts = productsData.filter((product) => product.type === type);
        console.log('Productos filtrados:', filteredProducts);
        setFilteredProducts(filteredProducts);
      }
    };
  
    return (
      <div>
        <label htmlFor="productType">Filtrar por tipo:</label>
        <select id="productType" value={selectedType} onChange={handleTypeChange}>
          <option value="">Todos</option>
          <option value="desayuno">Desayuno</option>
          <option value="almuerzo">Almuerzo</option>
          {/* Agrega aquí más opciones de tipo según tus necesidades */}
        </select>
      </div>
    );
  }