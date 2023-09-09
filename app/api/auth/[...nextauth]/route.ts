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
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      const name = profile?.name;
      const email = profile?.email;
      const provider = account?.provider;
      const id = user?.id;
      const image = user?.image;
      console.log("name=>", name);
      console.log("provider=>", provider);
      console.log("email=>", email);
      console.log("id=>", id);
      console.log("image=>", image);

      const isExist = await prisma.user.findUnique({
        where: { user_id: id as string },
      });

      console.log("isExist=>", isExist);

      if (isExist !== null) {
        console.log("in if");
        return true;
      } else {
        console.log("in else");

        if (account?.provider === "google") {
          console.log("in google");

          const apiUrl = `${process.env.BASE_URL}/api/user`;
          console.log("apiUrl", apiUrl);
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
          console.log("in github");

          const apiUrl = `${process.env.BASE_URL}/api/user`;
          console.log("apiUrl", apiUrl);
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
