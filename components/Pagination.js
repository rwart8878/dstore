import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  function goToNextPage() {
    if (currentPage === pages[pages.length - 1]) return;
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    if (currentPage === 1) return;
    setCurrentPage((page) => page - 1);
  }
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="dark:bg-zinc-900 flex justify-center">
      <div className="flex rounded-md mt-8">
        <a
          href="#"
          className="py-2 px-4 leading-tight dark:bg-zinc-800 dark:hover:text-white dark:hover:bg-green-500 dark:text-green-500 hover:bg-green-500 hover:text-white dark:border-gray-700 border border-gray-200 text-green-700 border-r-0 ml-0 rounded-l"
          onClick={() => goToPreviousPage()}
        >
          <span>Previous</span>
        </a>
        {pages.map((page, index) => {
          return (
            <a
              href="#"
              className="py-2 px-4 leading-tight dark:bg-zinc-800 dark:hover:bg-green-500 dark:hover:text-white dark:text-green-500 border border-gray-200 dark:border-gray-700 text-green-700 border-r-0 hover:bg-green-500 hover:text-white"
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </a>
          );
        })}
        <a
          href="#"
          className="py-2 px-4 leading-tight dark:bg-zinc-800 dark:hover:bg-green-500 dark:hover:text-white hover:text-white dark:text-green-500 border dark:border-gray-700 border-gray-200 text-green-700 rounded-r hover:bg-green-500"
          onClick={() => goToNextPage()}
        >
          <span>Next</span>
        </a>
      </div>
    </div>
  );
};

export default Pagination;
