"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import background from "../public/gradient.png";

// import { Input } from "@/components/ui/input";
import { Input } from "@nextui-org/react";
import { EnterIcon } from "@radix-ui/react-icons";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/navBar";
import { Link1Icon } from "@radix-ui/react-icons";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

const Page = () => {
  const { toast } = useToast();
  const [longUrl, setLongUrl] = useState("");
  // const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      // ("use server");
      if (longUrl.trim() === "") {
        console.log("Long URL is blank. Please enter a URL.");
        return;
      }
      const response = await fetch(`${process.env.BASE_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        setLongUrl("");
        toast({
          description: "Successfully shortened link!",
        });
      }

      console.log("longUrl", longUrl);
    } catch (error) {}
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 z-0 ">
        <Image
          src={background}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="absolute inset-0  bg-white opacity-60 z-0"></div>
      <NavBar signIn={signIn} signOut={signOut} session={session} />
      <div className="flex flex-col h-screen items-center justify-start  z-10 md:px-10">
        <div className="flex items-center justify-start mx-4 p-8 mb-4 pt-unit-40">
          <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            Url Shortener
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-row w-full max-w-sm items-center justify-center space-x-2 px-5 py-10 sm:px-0 md:px-0 xl:px-0"
        >
          <Input
            isRequired
            isClearable
            id="input_id"
            type="url"
            name="long_url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Shorten your link"
            aria-describedby="text-input"
            startContent={
              <Link1Icon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            onClear={() => setLongUrl("")}
            radius="sm"
          />
          <Button
            type="submit"
            isIconOnly
            radius="sm"
            color="danger"
            aria-label="Enter"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          >
            <EnterIcon className="h-4 w-4" />
          </Button>
        </form>
        <Toaster />
        <div className="pt-2 w-72 sm:w-64 md:w-96 xl:w-96">
          <Card>
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
