import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className=" h-[88vh] w-full flex flex-col justify-center">
      <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 ">
        <div className="flex flex-col mt-10 lg:mt-0 pt-12 lg:pt-0 text-center lg:text-left ">
          <h1 className="text-lg sm:text-2lg md:text-3xl lg:text-4xl xl:text-5xl  uppercase font-bold ">
            mega sale <span className="text-rose-600">Spacial</span> offer up to{" "}
            <span className="text-orange-500">60%</span>off
          </h1>
          <p className="text-black opacity-70 text-sm md:text-base lg:text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            recusandae iste corrupti asperiores alias cum ducimus, at sint,
            vitae modi, id repudiandae illum nobis eveniet quos ullam et
            reprehenderit tenetur?
          </p>
          <div className="flex items-center justify-center lg:justify-start space-x-4 mt-6">
            <Button size={'lg'} className="bg-blue-700 text-lg">Shop Now </Button>
            <Button size={'lg'} className="text-lg">Explore More</Button>
          </div>
        </div>
        {/* image */}
        <div className="flex justify-center lg:justify-end ">
            <Image src='/images/hero.svg'  width={600 } height={600} alt="hero image" className="lg:w-[60%] lg:h-[60%] xl:w-[80%] xl:h-[80%] "/>

        </div>
      </div>
    </div>
  );
};

export default Hero;
