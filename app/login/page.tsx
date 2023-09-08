"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
const Login = () => {
  const session = useSession();
  if (session.data === null) {
    return (
      <>
        <Button
          type="submit"
          className="shadow-lg"
          onClick={() => signIn("google")}
        >
          Login with Google
        </Button>

        <Button
          type="submit"
          className="shadow-lg"
          onClick={() => signIn("github")}
        >
          {/* <GitHubLogoIcon className="h-4 w-4 pr-2" /> */}
          Login with Github
        </Button>
      </>
    );
  }
  if (session.status === "authenticated") {
    console.log("session", session);
    return (
      <Button type="submit" className="shadow-lg" onClick={() => signOut()}>
        Logout
      </Button>
    );
  }

  console.log("session", session);

  return (
    <>
      <Button
        type="submit"
        className="shadow-lg"
        onClick={() => signIn("google")}
      >
        Login with Google
      </Button>

      <Button
        type="submit"
        className="shadow-lg"
        onClick={() => signIn("github")}
      >
        {/* <GitHubLogoIcon className="h-4 w-4 pr-2" /> */}
        Login with Github
      </Button>
    </>
  );
};

export default Login;
