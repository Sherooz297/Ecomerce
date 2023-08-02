// Pagination.js

import React from 'react';
import './pagination.css';

const Pagination = ({ activePage, onChange }) => {
  const handlePageChange = (pageNumber) => {
    if (onChange) {
      onChange(pageNumber);
    }
  };

  return (
    <div className='paginationBox'>
      <nav aria-label='Page navigation example'>
        <ul className='inline-flex -space-x-px text-sm '>
          <li>
            <a
              href='#'
              className='flex items-center justify-center p-10 px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => handlePageChange(activePage - 1)}
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex items-center justify-center px-3 h-8 leading-tight p-10  ${
                activePage === 1
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 bg-white'
              } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
              onClick={() => handlePageChange(1)}
            >
              1
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex items-center justify-center px-3 h-8 leading-tight p-10 ${
                activePage === 2
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 bg-white'
              } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
              onClick={() => handlePageChange(2)}
            >
              2
            </a>
          </li>
          {/* Add more <li> elements based on the backend data */}
          {/* For example, if you receive the total number of pages from the backend, you can render them dynamically */}
          {/* <li>...</li> */}
          <li>
            <a
              href='#'
              className={`flex items-center justify-center px-3 h-8 leading-tight p-10 ${
                activePage === 3
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 bg-white'
              } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
              onClick={() => handlePageChange(3)}
            >
              3
            </a>
          </li>
          {/* Add more <li> elements based on the backend data */}
          {/* For example, if you receive the total number of pages from the backend, you can render them dynamically */}
          {/* <li>...</li> */}
          <li>
            <a
              href='#'
              className='flex items-center justify-center p-10 px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => handlePageChange(activePage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
