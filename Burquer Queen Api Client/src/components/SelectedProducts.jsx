import React from "react";

const SelectedProducts = ({ filteredProducts, handleButtonClick, handleDeleteButtonClick }) => {
  return (
    <section className="sectionProductos">
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <button
            className="buttonProductos"
            onClick={() => handleButtonClick(product)}
          >
            {product.name} ${product.price}
          </button>
        </div>
      ))}
    </section>
  );
};

export default SelectedProducts;