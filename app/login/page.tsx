
import { auth, signIn } from "@/app/(auth)/authSetup";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const LoginPage =  async () => {
  const session = await auth()

  return (
    <div className="min-h-[88vh] flex items-center justify-center">
      <div className=" p-8  shadow-xl bg-gray-50 w-96 rounded-md">

    

        {session?.user ? (<div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 mx-auto ">{`Hello ${session.user.name}`}</h2>
          <Link href='/' className="hover:underline text-gray-700 text-lg font-semibold">Go To Home Page</Link>
        </div>) : (
          <div>
          <h2 className="text-2xl font-semibold mb-4 mx-auto text-center">
          Login
        </h2>
        <form >
        <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your username"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
        <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your Password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                  type="submit"
                  className="my-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
      </form>
      <div className="w-full rounded-2xl h-[1.5px] border my-6 relative"><span className=" absolute top-0 left-[50%] bg-gray-50  px-4 -translate-y-[50%] -translate-x-[50%] flex items-center justify-center font-semibold">Or</span></div>
        <div className="flex space-x-10 items-center ">
          <div className="w-1/2 flex justify-center border rounded-xl p-4 cursor-pointer">
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">
                <FaGoogle size={26} className="text-gray-700" />
              </button>
            </form>
          </div>
          {/* <p className="text-gray-500 font-bold text-xl">Or</p> */}
          <div className="w-1/2 flex justify-center mt-2 border rounded-xl p-4 cursor-pointer">
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <FaGithub size={26} className="text-gray-700" />
              </button>
            </form>
          </div>


          {/* <div className="w-1/2 flex justify-center mt-2 border rounded-xl p-4 cursor-pointer">
            <form
              action={async () => {
                "use server";
                await signIn("twitter");
              }}
            >
              <button type="submit">
                <FaTwitter size={26} className="text-gray-700" />
              </button>
            </form>
          </div> */}
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
