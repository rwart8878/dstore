import React, { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import Loading from "./Loading";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, SunIcon, MoonIcon } from "@heroicons/react/solid";
import { ShoppingCartIcon, MenuIcon, UserIcon } from "@heroicons/react/outline";
import Cart from "./Cart";

const Pheader = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-6 h-6 pl-1 text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-6 h-6 pl-1 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/" });
  };
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header>
        <div className="dark:bg-zinc-900 container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
                EStore
              </div>
            </Link>
            <div className="flex items-center justify-end w-full">
              {status === "loading" ? (
                <Loading />
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-green-600 focus:outline-none ">
                      {session.user.name}
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md dark:bg-zinc-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push("/profile")}
                              className={`${
                                active
                                  ? "bg-green-600 text-white"
                                  : "text-gray-900 dark:text-green-500"
                              } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push("/order-history")}
                              className={`${
                                active
                                  ? "bg-green-600 text-white"
                                  : "text-gray-900 dark:text-green-500"
                              } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                            >
                              Order History
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutClickHandler}
                              className={`${
                                active
                                  ? "bg-green-600 text-white"
                                  : "text-gray-900 dark:text-green-500"
                              } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link href="/login">
                  <span className="dark:text-green-500 inline-flex text-gray-600 hover:underline pr-2 mx-4 sm:mx-0">
                    LOGIN
                    <UserIcon className="h-5 w-5 dark:text-green-500" />
                  </span>
                </Link>
              )}
              <button className="text-gray-600 focus:outline-none px-0 mx-4 sm:mx-0">
                <ShoppingCartIcon
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="h-5 w-5 dark:text-green-500"
                />
              </button>
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
              <div className="flex sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <MenuIcon className="h-5 w-5 dark:text-green-500" />
                </button>
              </div>
              {renderThemeChanger()}
            </div>
          </div>
          <nav
            className={`${
              isMenuOpen ? "" : "hidden"
            } sm:flex sm:justify-center sm:items-center mt-4`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/">Home</Link>
              </div>
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/products">Shop</Link>
              </div>
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/category">Categories</Link>
              </div>
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/about">About</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <ToastContainer theme="colored" position="bottom-center" limit={1} />
    </>
  );
};

export default Pheader;
