import React, { useState, useContext } from "react";
import Image from "next/image";
import { Store } from "../utils/Store";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductDetail = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const [count, setCount] = useState(1);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + count : count;

    if (product.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  const handleup = () => {
    setCount(count + 1);
  };
  const handledown = () => {
    if (count > 0) setCount(count - 1);
  };
  return (
    <div className="md:flex md:items-center dark:bg-zinc-800">
      <div className="w-full h-64 md:w-1/2 lg:h-96 relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="absolute z-0 rounded"
        />
      </div>
      <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <h3 className="dark:text-gray-200 text-gray-700 uppercase text-lg">
          {product.name}
        </h3>
        <span className="dark:text-gray-300 text-gray-500 mt-3">
          ${product.price}
        </span>
        <hr className="my-3" />
        <div className="mt-2">
          <label
            className="dark:text-gray-200 text-gray-700 text-sm"
            htmlFor="count"
          >
            Count:
          </label>
          <div className="flex items-center mt-1">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handleup}
            >
              <PlusCircleIcon className="w-5 h-5 dark:text-gray-200" />
            </button>
            <span className="dark:text-gray-200 text-gray-700 text-lg mx-2">
              {count}
            </span>
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handledown}
            >
              <MinusCircleIcon className="w-5 h-5 dark:text-gray-200" />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button
            className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
