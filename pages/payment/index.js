import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckOutWizard from "../../components/CheckOutWizard";
import Head from "next/head";
import Pheader from "../../components/Pheader";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import { Store } from "../../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>E-commerce - Payment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-zinc-900 bg-white w-full min-h-screen">
        <Pheader />
        <Container>
          <CheckOutWizard activeStep={2} />
          <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
            <h1 className="mb-4 text-xl">Payment Method</h1>
            {["PayPal", "Stripe", "Cash On Delivery"].map((payment) => (
              <div key={payment} className="mb-4">
                <input
                  name="paymentMethod"
                  className="p-2 outline-none focus:ring-0"
                  id={payment}
                  type="radio"
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />

                <label className="p-2" htmlFor={payment}>
                  {payment}
                </label>
              </div>
            ))}
            <div className="mb-4 flex justify-between">
              <button
                onClick={() => router.push("/shipping")}
                type="button"
                className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
              >
                Back
              </button>
              <button className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
                Next
              </button>
            </div>
          </form>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

PaymentScreen.auth = true;
