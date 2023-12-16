/**
 * NextAuth handler for authentication using Google and GitHub providers.
 *
 * Configures NextAuth with Google and GitHub providers using client IDs
 * and secrets from environment variables.
 *
 * The signIn callback checks if the user exists in the database.
 * If not, it makes an API call to /api/user to create the user,
 * passing profile data from Google/GitHub.
 *
 * Exports the configured NextAuth handler.
 */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";
import prisma from "../../../../lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const name = profile?.name;
      const email = profile?.email;
      const provider = account?.provider;
      const id = user?.id;
      const image = user?.image;

      const isExist = await prisma.user.findUnique({
        where: { user_id: id as string },
      });

      if (isExist !== null) {
        return true;
      } else {
        if (account?.provider === "google") {
          const apiUrl = `${process.env.BASE_URL}/api/user`;
          const postData = {
            name: name,
            email: email,
            provider: provider,
            id: id,
            image: image,
          };
          const response = await axios.post(apiUrl, postData);
          return true;
        } else if (account?.provider === "github") {
          const apiUrl = `${process.env.BASE_URL}/api/user`;
          const postData = {
            name: name,
            email: email,
            provider: provider,
            id: id,
            image: image,
          };
          const response = await axios.post(apiUrl, postData);
          return true;
        } else {
          // todo if we use the email/password login method
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
