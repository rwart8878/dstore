import Head from "next/head";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

export default function index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-zinc-900 bg-white w-full min-h-screen">
        <Header />
        <Container>
          <h3 className="dark:text-gray-200 text-gray-700 text-2xl font-medium block mt-16">
            About
          </h3>
          <p className="dark:text-gray-200 text-gray-700 text-1xl font-small block mt-16">
            This was my project to learn mongodb realm and Tailwind css. I hope
            you liked it.
          </p>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
