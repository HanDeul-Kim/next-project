import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '9aa4aba2f24457673e8a',
      clientSecret: '7af4346d8662e308caadd9e481cf1305e0c467d9',
    }),
  ],
  secret : 'dlffos12',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 