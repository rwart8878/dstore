import React from "react";
import Category from "../components/Category";

const Categories = ({ categorys, categoryCount }) => {
  return (
    <div>
      <h3 className="dark:text-gray-200 text-gray-700 text-2xl font-medium block mt-16">
        Categories
      </h3>
      <span className="mt-3 text-sm dark:text-gray-300 text-gray-500">
        {categoryCount}
      </span>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
        {categorys.map((category) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
