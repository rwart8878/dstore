import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Loading from "../components/Loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  useEffect(() => {
    (async () => {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const allProducts = await user.functions.getAllProducts();
        setProducts(() => allProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [loading]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-zinc-900 bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Hero />
          {loading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          <Products products={currentPosts} />
          <Pagination
            totalPosts={products.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
