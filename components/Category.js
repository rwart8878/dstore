import React from "react";
import Image from "next/image";
import Link from "next/link";

const Category = ({ category }) => {
  return (
    <Link href={`/category/${category}`}>
      <div className="w-full dark:hover:shadow-slate-700  max-w-sm mx-auto rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition">
        <div className="flex items-end justify-end h-56 w-full bg-cover relative">
          <Image
            src={`/images/${category}.jpg`}
            alt={category}
            fill
            style={{ objectFit: "cover" }}
            className="absolute z-0"
          />
        </div>
        <div className="px-5 py-3 dark:bg-zinc-800">
          <h3 className="dark:text-gray-300 text-gray-700 uppercase">{`${category}s`}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Category;
