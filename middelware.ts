export { auth as middleware } from "@/app/(auth)/authSetup"

// import { auth } from "@/app/(auth)/authSetup"
 
// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
// })


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }