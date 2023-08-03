import React from "react";

const SelectedProducts = ({ filteredProducts, handleButtonClick }) => {
  return (
    <section className="sectionProductos">
      {filteredProducts.map((product) => (
        <button
          className="buttonProductos"
          key={product.id}
          onClick={() => handleButtonClick(product)}
        >
          {product.name} ${product.price}
        </button>
      ))}
    </section>
  );
};

export default SelectedProducts;