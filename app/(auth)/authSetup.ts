import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Twitter from "next-auth/providers/twitter"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github,Twitter],

  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})