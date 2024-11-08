'use client'
import React from "react";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { addToFav, removeFromFav } from "@/store/favSlice";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  
  // Retrieve the list of favorite products from the Redux store
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  const cartItems = useSelector((state: RootState) => state.Cart.items);

  // Check if the product is already a favorite
  const inCart = cartItems.some((item) => item.id === product.id);
  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  // Add product to the cart
  const AddToCartHandler = (e: React.MouseEvent,product: Product) => {
    e.stopPropagation()
    e.preventDefault()
    if(inCart){
      toast({
        description: "Item Already in Cart",
        variant: "success",
      });
    }else{

      toast({
        description: "Item Added to Cart",
        variant: "success",
      });
      dispatch(addItem(product));
    }
  };

  // Add or remove the product from favorites
  const AddToFavHandler = (product: Product) => {
    if (isFavorite) {
      toast({
        description: "Item Removed from Favorites",
        variant: "destructive",
      });
      dispatch(removeFromFav({ id: product.id })); // Remove from favorites
    } else {
      toast({
        description: "Item Added to Favorites",
        variant: "success",
      });
      dispatch(addToFav(product)); // Add to favorites
    }
  };

  // Render rating stars
  const num = Math.round(product.rating.rate);
  const ratingArray = new Array(num).fill(0);

  return (
    <div
      className={`p-6 mt-4 shadow-xl rounded-xl bg-white}`}
    >
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
          className="w-[200px] h-[150px] object-contain"
        />
      </div>
      <p className="text-sm mt-5 capitalize">{product.category}</p>
      <Link href={`/product/product-details/${product.id}`}>
        <h1 className="hover:underline hover:text-blue-900 mt-2 transition-all text-black text-lg font-semibold cursor-pointer sm:w-full truncate">
          {product.title}
        </h1>
      </Link>

      {/* Stars */}
      <div className="flex items-center mt-2">
        {ratingArray.map((star, index) => (
          <StarIcon key={index} size={16} fill="yellow" className="text-yellow-500" />
        ))}
      </div>

      {/* Price */}
      <div className="flex items-center space-x-4 mt-2">
        <p className="text-black opacity-60 text-lg line-through">
          ${(product.price + 10).toFixed(2)}
        </p>
        <p className="text-lg font-semibold">${product.price}</p>
      </div>

      {/* Buttons */}
      <div className="flex items-center mt-4 space-x-4">
        <Button
          size="icon"
          onClick={(e) => AddToCartHandler(e,product)}
        >
          <ShoppingBag size={18} />
        </Button>
        <Button
          onClick={() => AddToFavHandler(product)}
          size="icon"
          className={`bg-gray-300`}
        >
          <Heart size={18} fill={isFavorite ? 'red ' : 'white'} color={isFavorite ? "red" : "white"} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
