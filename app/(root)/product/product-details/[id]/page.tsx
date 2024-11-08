import ProductCard from "@/components/home/ProductCard";
import { getProductByCategory, getSinglePorduct } from "@/Request/requests";
import { Product } from "@/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import AddToCart from "../Add-cart";

const ProductDetails = async ({ params }: { params: { id: number } }) => {
  const id = params?.id.toString();
  const singleProduct: Product = await getSinglePorduct(id);
  const relatedProduct: Product[] = await getProductByCategory(
    singleProduct.category
  );
  const num = Math.round(singleProduct?.rating?.rate);
  const starArray = new Array(num).fill(0);
  //   console.log(relatedProduct);

  // console.log(singleProduct)
  return (
    <div className="mt-20">
      <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-7 items-center gap-4">
        <div className="col-span-3 mb-6 lg:mb-0">
          <Image
            src={singleProduct.image}
            alt={singleProduct.title}
            width={400}
            height={400}
          />
        </div>
        <div className="col-span-4">
          <h1 className="text-2xl lg:text-3xl text-black font-bold">
            {singleProduct.title}
          </h1>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex items-center">
              {starArray.map((star) => {
                return (
                  <>
                    <div key={star}>
                      <StarIcon
                        className="text-yellow-400"
                        fill="yellow"
                        size={25}
                      />
                    </div>
                  </>
                );
              })}
            </div>
            <p className="text-base">
              ({singleProduct?.rating.count} Reviews){" "}
            </p>
          </div>
          <span className="w-1/4 mt-4 mb-4 opacity-20 bg-gray-400 rounded-lg h-[1.5px] block"></span>
          <h1 className="text-3xl md:text-4xl lg:text-7xl text-blue-950 font-bold  ">
            {singleProduct?.price.toFixed(2)}
          </h1>
          <p className="mt-4 text-base text-black opacity-70">
            {singleProduct?.description}
          </p>
          <p className="mt-4 text-sm text-black text-opacity-70 font-semibold">
            {singleProduct?.category}
          </p>
          <p className="mt-4 text-sm text-black text-opacity-70 font-semibold">
            Tag:Shop
          </p>
          <p className="mt-4 text-sm text-black text-opacity-70 font-semibold">
            SKU : {Math.random() * 500}
          </p>
          <AddToCart product={singleProduct} />
        </div>
      </div>
      <div className="w-4/5 mx-auto mt-16">
        <h1 className="font-semibold text-black text-3xl lg:text4xl ">
          Related Products
        </h1>
        <div className=" mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {relatedProduct.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
