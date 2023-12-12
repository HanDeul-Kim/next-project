import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '9aa4aba2f24457673e8a',
      clientSecret: '7af4346d8662e308caadd9e481cf1305e0c467d9',
    }),
  ],
  secret : 'dlffos12'
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     })
//   ]
};
export default NextAuth(authOptions); 