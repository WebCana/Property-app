import { authOptions } from "@/utils/authOptions";
//import { AuthOptions } from "next-auth";
import NextAuth from 'next-auth/next'

// openssl rand -base64 32 // to generate pw secret in env file

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST};
