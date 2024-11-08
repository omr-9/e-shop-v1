"use client";
import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react"; // Importing the Search icon from lucide-react

const SearchDialog = () => {
  

  const [isInputVisible, setInputVisible] = useState(false); 
  const toggleSearchInput = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className="relative mt-4 md:mt-0">
      {!isInputVisible && (
        <span className="cursor-pointer" onClick={toggleSearchInput}>
          <SearchIcon size={24} />
        </span>
      )}

      {isInputVisible && (
        <>
          <span
            className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
            onClick={toggleSearchInput}
          >
            <SearchIcon size={24} />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 transition-all duration-300 ease-in-out"
            placeholder="Search..."
          />
        </>
      )}
    </div>
  );
};

export default SearchDialog;
