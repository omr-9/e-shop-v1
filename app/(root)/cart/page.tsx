"use client";
import { Button } from "@/components/ui/button";
import { addItem, CartItem, removeItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import converToSubcurrency from "@/lib/convertToSubcurrency";
// Stripe payment imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/components/CheckoutForm";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY == undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY Is Not Defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const items = useSelector((state: RootState) => state.Cart.items);
  const dispatch = useDispatch();
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const vat = (+totalPrice * 0.15).toFixed(2);
  const totalPriceWithVat = (+totalPrice + +vat).toFixed(2);

  // Session check
  const session = useSession();
  const user = session.status === "authenticated";
  
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    stripePromise.then(() => setStripeReady(true));
  }, []);

  const handleAddCart = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem({ id }));
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="mt-8 min-h-[60vh]">
      {items.length === 0 && (
        <div className="flex w-full h-[80vh] items-center justify-center flex-col">
          <Image
            src="/images/noitems.png"
            alt="empty cart"
            width={400}
            height={400}
            className="object-contain"
          />
          <Link href="/">
            <Button className="mt-4 text-lg" size="lg">
              Shop Now
            </Button>
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="w-4/5  mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12">
          <div className="xl:col-span-4 rounded-lg shadow-md overflow-hidden">
            <h1 className="p-4 bg-indigo-950 text-white font-semibold text-xl sm:text-2xl md:text-3xl">
              Your Cart ({totalQuantity} Items)
            </h1>
            {items.map((item) => (
              <div key={item.id}>
                <div className="border-b-[1.5px] mt-5 border-gray-500 rounded-lg p-5 border-opacity-20  flex items-center flex-col md:flex-row  md:mb-0 md:space-x-10 pb-6">
                  <div className="mb-10">
                    <Link href={`/product/product-details/${item.id}`}>
                    
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={180}
                      height={180}
                      className="object-contain aspect-auto "
                    />
                    </Link>
                  </div>
                  <div>
                    <div className="space-y-1">
                      <h1 className="md:text-xl text-black font-bold text-base">
                        {item.title}
                      </h1>
                      <h1 className="md:text-lg text-black font-semibold text-base">
                        Category : {item.category}
                      </h1>
                      <h1 className="md:text-2xl text-blue-950 font-bold text-lg">
                        ${item.price * item.quantity}
                      </h1>
                      <h1 className="md:text-base text-black text-base">
                        Quantity : {item.quantity}
                      </h1>
                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                      <Button
                        size={"lg"}
                        className="text-lg"
                        onClick={() => handleAddCart(item)}
                      >
                        Add More
                      </Button>
                      <Button
                        size={"lg"}
                        className="text-lg"
                        onClick={() => handleRemove(item.id)}
                        variant={"destructive"}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="xl:col-span-2">
            <div className="sticky top-[25vh] rounded-lg p-6 bg-indigo-950">
              <h1 className="text-3xl font-bold text-center text-white my-8">
                Summary
              </h1>
              <div className="w-full h-[1.5px] bg-white bg-opacity-50 rounded-lg"></div>
              <div className="flex items-center justify-between uppercase text-xl font-semibold mt-4 text-white">
                <span>Sub Total</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex items-center justify-between uppercase text-xl font-semibold my-10 text-white">
                <span>vat</span>
                <span>${vat}</span>
              </div>
              <div className="flex items-center justify-between uppercase text-xl font-semibold mb-6 text-white">
                <span>Shipping</span>
                <span>free</span>
              </div>
              <div className="w-full h-[1.5px] bg-white bg-opacity-50 rounded-lg"></div>
              <div className="flex items-center justify-between uppercase text-xl font-semibold my-6 text-white">
                <span>Total</span>
                <span>${totalPriceWithVat}</span>
              </div>
              {!user && (
                <Link href="/login">
                  <Button className="bg-orange-500 w-full">
                    Sign in to checkout
                  </Button>
                </Link>
              )}
              {user && stripeReady && (
                <div className="mt-4 p-4 rounded bg-green-100">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount: converToSubcurrency(+totalPriceWithVat),
                      currency: "usd",
                    }}
                  >
                    <CheckoutForm totalPriceWithVat={+totalPriceWithVat} />
                  </Elements>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
