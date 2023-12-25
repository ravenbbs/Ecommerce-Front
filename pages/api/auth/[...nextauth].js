import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"



export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
      authorization: {
      params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  cookies : {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};
export default NextAuth(authOptions)

