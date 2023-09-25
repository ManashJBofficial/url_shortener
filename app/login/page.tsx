"use client";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import loginBG from "../../public/loginbg.jpg";
import Image from "next/image";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { EnterIcon } from "@radix-ui/react-icons";
import GoogleIcon from "../../public/google.svg";
import GithubLight from "../../public/github-light.svg";
import { useEffect } from "react";
// import GithubDark from "../../public/github-dark.svg";
import { redirect } from "next/navigation";

const Login = () => {
  const session = useSession();
  if (session.data === null) {
    return (
      <>
        <div className="flex flex-col md:flex-row">
          <Image
            className="hidden md:block lg:block md:w-7/12 h-screen bg-cover bg-center relative opacity-2"
            src={loginBG}
            alt="background image"
            placeholder="blur"
            quality={70}
          />
          <div className="md:w-5/12  p-8 flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-3xl m-10">Login</h1>
            <Card className="w-80">
              <CardBody>
                <Button
                  type="submit"
                  className="mb-4 w-full h-14 bg-google text-black hover:bg-opacity-80 hover:text-white"
                  onClick={() => signIn("google")}
                >
                  <Image
                    src={GoogleIcon}
                    className="h-8 w-8 mr-4"
                    alt="google login"
                  />
                  <span className="text-base">Login with Google</span>
                </Button>

                <Button
                  type="submit"
                  className="w-full h-14 bg-github text-black hover:bg-opacity-80 hover:text-white"
                  onClick={() => signIn("github")}
                >
                  <Image
                    src={GithubLight}
                    className="h-8 w-8 mr-4"
                    alt="google login"
                  />
                  <span className="text-base">Login with Github</span>
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  }
  if (session.status === "authenticated") {
    console.log("authenticated", session);
    redirect("/dashboard");
  }
};

export default Login;
