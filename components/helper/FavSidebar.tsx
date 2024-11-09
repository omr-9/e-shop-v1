import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";
import { addToFav, CartItem, removeFromFav } from "@/store/favSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type Props = {
  items: CartItem[];
};
const FavSidebar = ({ items }: Props) => {
  const dispatch = useDispatch();
  const handleAddFav = (item: CartItem) => dispatch(addToFav(item));

  const handleRemove = (id: number) => {
    toast({
      description: "Item removed from Favorites",
      variant: "destructive",
      
    });
    dispatch(removeFromFav({ id }))};
  return (
    <div className="my-6 h-full">
      <h1 className="font-bold text-lg mb-6 text-center text-black ">
        Your Favorites
      </h1>
      {items.length === 0 && (
        <div className="flex items-center h-[80vh] w-full justify-center ">
          {" "}
          <Image
            src="/images/no.products.png"
            width={200}
            height={200}
            alt="no products here"
            className="object-contain"
          />
        </div>
      )}
      {items.length > 0 &&
        items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col w-full border-b-2 border-gray-400 border-opacity-25 rounded-xl shadow-lg p-4 mb-8"
            >
              {" "}
              <div className="mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                />
              </div>
              <div>
             
        <h1 className=" mt-2 transition-all  text-black text-lg font-semibold  sm:w-full truncate">
          {item.title}
        </h1>
     
                <h1 className="font-bold text-blue-950 truncate text-lg mb-2">
                  ${(item?.price).toFixed(2)}
                </h1>

                <div className="flex items-center justify-between mt-4 ">
                  <AlertDialog>
                    <AlertDialogTrigger  className="bg-red-600 text-white !py-2 !px-4 rounded-lg text-sm md:text-lg  md:font-semibold capitalize hover:bg-red-800">remove</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Remove Product?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                        Are you absolutely sure to remove this product from fav products?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel >Cancel</AlertDialogCancel>

                        <AlertDialogAction  className= " bg-red-600" 
                            onClick={() => {
                              handleRemove(item.id);
                            }} >
                          {" "}
                         Yes, sure
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                <Link  href={`/product/product-details/${item.id}`}>
        <button className="bg-indigo-800 px-4 py-2 text-white rounded-lg text-sm md:text-lg md:font-semibold capitalize hover:bg-indigo-950">
          View  
        </button>
      </Link>
                </div>
              </div>
            </div>
          );
        })}
      <Link href="/cart">
        <SheetClose className="w-full">
          <Button className="w-full text-lg my-6">View Cart Page</Button>
        </SheetClose>
      </Link>
    </div>
  );
};

export default FavSidebar;
