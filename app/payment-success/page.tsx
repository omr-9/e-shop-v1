import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ totalPrice: string }>;
}) {
  
  const { totalPrice } = await searchParams;

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-indigo-950">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-indigo-950 mt-5 text-4xl font-bold">
          ${totalPrice}
        </div>

        <Link href="/">
          <Button className="text-xl hover:bg-indigo-950 hover:border bg-white mt-6 text-indigo-950 font-semibold hover:text-white" size={"lg"}>
            Buy More
          </Button>
        </Link>
      </div>
    </main>
  );
}
