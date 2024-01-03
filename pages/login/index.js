import Link from "next/link";
import Head from "next/head";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Pheader from "../../components/Pheader";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

export default function LoginScreen() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    } catch (err) {
      toast.error(getError(err));
    }
    return loading;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>E-commerce - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" dark:bg-zinc-900 bg-white w-full min-h-screen">
        <Pheader />
        <Container>
          {loading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">Login</h1>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                className="w-full border dark:border-gray-700 rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
                type="email"
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
                id="email"
                placeholder="Enter Email"
                autoFocus
              ></input>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Please enter password",
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
                className="w-full dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="Enter Password"
                autoFocus
              ></input>
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4 ">
              <button className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
                Login
              </button>
            </div>
            <div>
              Don&apos;t have an account? &nbsp;
              <Link
                href={`/register?redirect=${redirect || "/"}`}
                className="mt-3 text-blue-600 hover:underline sm:mx-3 sm:mt-0"
              >
                Register
              </Link>
            </div>
          </form>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
