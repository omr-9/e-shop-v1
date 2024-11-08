import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchDialog from "../helper/SearchDialog";
import { UserIcon } from "lucide-react";
import ShoppingCartBtn from "../helper/ShoppingCartBtn";
import { auth, signOut } from "@/app/(auth)/authSetup";
import AddToFav from "../helper/AddToFavSheet";


const Navbar = async () => {
  const session = await auth();
  return (
    <div className="bg-white h-[12vh] shadow-md sticky top-0 z-[1] md:mb-10 lg:mt-0">
      <div className="flex items-center justify-between md:w-4/5 mx-auto h-full w-[95%]">
        <Link href="/">
          <Image
            src="/images/e-shop.png"
            width={140}
            height={140}
            alt=" logo"
          ></Image>
        </Link>
        <div className="flex items-center space-x-6">
          <SearchDialog />
          <AddToFav />
          <Link href="/cart">
            <ShoppingCartBtn />
          </Link>

          {session?.user ? (
            <div className="flex items-center">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <div className="flex items-center">
                  <Image
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                    height={42}
                    width={42}
                    className={`object-contain rounded-full m-4 cursor-pointer`}
                  />

                  <button className="hover:underline font-semibold text-xl">
                    Logout
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <Link href="/login">
              <UserIcon cursor={"pointer"} size={26} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
