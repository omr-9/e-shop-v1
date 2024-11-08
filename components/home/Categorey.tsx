"use client";
import { getAllCategory } from "@/Request/requests";
import React, { useEffect, useState } from "react";

// Component to render categories
const Categorey = ({ onSelectCategory, activeCategory }: { onSelectCategory: (category: string) => void; activeCategory:string }) => {
  const [categories, setCategories] = useState<string[]>([]);


  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategory();
        setCategories(["All",...categories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="pt-4 pb-3 md:pt-4 md:pb-12 md:mb-12">
      <h1 className="font-bold text-center text-2xl lg:text-3xl capitalize">Shop by Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-4/5 mx-auto gap-8 mt-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`p-6 rounded-lg cursor-pointer text-center hover:scale-110 duration-300 transition-all shadow-md capitalize   ${activeCategory === cat ? 'bg-gray-700 text-white' :' bg-gray-200 text-black' }`}
            onClick={() => onSelectCategory(cat)} // Handle category selection
          >
            <h1 className="text-sm sm:text-base md:text-lg capitalize font-bold">{cat}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorey;
