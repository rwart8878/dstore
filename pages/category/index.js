import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Categories from "../../components/Categories";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

import Loading from "../../components/Loading";
export default function index() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const allCategories = await user.functions.getAllCategories();
        setCategories(() => allCategories);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [loading]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>E-Commerce - Categories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-zinc-900 bg-white w-full min-h-screen">
        <Header />
        <Container>
          {loading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          <Categories
            categorys={categories}
            categoryCount={`${categories.length} Categories available`}
          />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
