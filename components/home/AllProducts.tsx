"use client";
import { getAllProducts } from "@/Request/requests";
import { Product } from "@/types";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Categorey from "./Categorey";

// Component to display all products and filter by category
const AllProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); 

  // Fetch all products or filter by selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts: Product[] = await getAllProducts();
        if (selectedCategory === "Top price") {
          const filteredTopPriceProducts = allProducts.filter(
            (product) => product.price >= 100 
          );
          setProducts(filteredTopPriceProducts);
        } else if (selectedCategory === "All" || !selectedCategory) {
          // Show all products if "All" is selected
          setProducts(allProducts);
        } else {
        
          const filteredProducts = allProducts.filter(
            (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
          );
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); 

  // Handle category selection from Categorey/> 
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="pt-16 pb-12">

      <Categorey onSelectCategory={handleSelectCategory} activeCategory={selectedCategory} /> {/* Pass handler to Categorey */}

      <h1 className="font-bold text-center text-2xl lg:text-3xl mt-10 capitalize">{selectedCategory} Products</h1>
      {loading ? (
        <div className="mt-16 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-4/5 mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
