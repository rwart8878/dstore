import React, { useContext, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import {
  XIcon,
  PlusCircleIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const [first, setFirst] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.error(first + " this coupon is not valid");
  };
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item) => {
    const existItem = item.quantity;
    const quantity = existItem + 1;
    if (item.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <div
      className={`${
        isCartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto dark:bg-zinc-800 bg-white border-l-2 dark:border-gray-900 border-gray-300 z-20`}
    >
      <div className="flex items-center justify-between">
        <h3 className="dark:text-gray-200 text-2xl font-medium text-gray-700">
          Your cart
        </h3>
        <button className="text-gray-600 focus:outline-none">
          <XIcon
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="h-5 w-5 dark:text-green-500"
          />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link
            className="inline-flex text-blue-600 hover:underline pr-2 mx-4 sm:mx-0"
            href="/"
          >
            Go shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <hr className="my-3" />
              <div className="flex justify-between mt-6">
                <div className="flex">
                  <Image
                    src={item.image}
                    height={80}
                    width={80}
                    style={{ objectFit: "cover" }}
                    className="rounded"
                    alt={item.name}
                  />
                  <div className="mx-3">
                    <h3 className="text-sm dark:text-gray-300 text-gray-600">
                      {item.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <button
                        className="text-gray-500 focus:outline-none focus:text-gray-600"
                        onClick={() => updateCartHandler(item)}
                      >
                        <PlusCircleIcon className="h-5 w-5 dark:text-gray-200" />
                      </button>
                      <span className="dark:text-gray-300 text-gray-700 mx-2">
                        {item.quantity}{" "}
                      </span>
                      <button
                        className="text-gray-500 focus:outline-none focus:text-gray-600"
                        onClick={() => removeItemHandler(item)}
                      >
                        <XIcon className="h-5 w-5 dark:text-gray-200" />
                      </button>
                    </div>
                  </div>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  ${item.price}
                </span>
              </div>
            </div>
          ))}
          <div className="mt-9">
            <form
              className="flex items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input
                className="form-input w-48"
                type="text"
                id="first"
                name="first"
                placeholder=" Add promocode"
                value={first}
                onChange={(event) => setFirst(event.target.value)}
              />
              <button
                type="submit"
                className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
              >
                <span>Apply</span>
              </button>
            </form>
            <div className="pb-3 text-xl">
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </div>
          </div>
          <Link
            href="/login?redirect=/shipping"
            className="flex items-center justify-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500 cursor-pointer"
          >
            <span>Check out</span>
            <ArrowNarrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
