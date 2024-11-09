import Home from "@/components/home/Home";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <SessionProvider>
        <Home />
      </SessionProvider>
    </div>
  );
}
