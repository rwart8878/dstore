import React from "react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <>
      <h3 className="dark:text-gray-300 text-gray-700 text-2xl font-medium block mt-16">
        Tech Edition
      </h3>
      <span className="dark:text-gray-300 mt-3 text-sm text-gray-500">
        {products.length}
      </span>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
