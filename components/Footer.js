import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-zinc-800 bg-gray-200 sticky top-[100vh]">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-green-500 hover:text-green-400 cursor-pointer">
          <Link href="/">EStore</Link>
        </div>
        <p className="py-2 dark:text-green-500 text-gray-500 sm:py-0">
          All rights reserved © 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
