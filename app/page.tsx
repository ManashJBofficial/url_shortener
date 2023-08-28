"use client";

import { useState } from "react";
import Image from "next/image";
import background from "../public/gradient.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnterIcon } from "@radix-ui/react-icons";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const { toast } = useToast();
  const [longUrl, setLongUrl] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      // ("use server");
      const response = await fetch("http://localhost:3000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }), // Pass the longUrl in the request body
      });
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        setLongUrl("");
        toast({
          description: "Successfully shortened link!",
        });
      }
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

      <div className="flex flex-col h-screen items-center justify-center  z-10 md:px-10">
        <div className="flex items-center justify-center mx-4 p-8 mb-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            Url Shortener
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-row w-full max-w-sm items-center justify-center space-x-2 px-5 py-10 sm:px-0 md:px-0 xl:px-0"
        >
          <Input
            type="url"
            placeholder="Shorten your link"
            className="shadow-lg border-black bg-slate-50"
            name="long_url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            pattern="https://.*"
            title="Please enter a valid URL starting with 'https://'"
            required
          />
          <Button type="submit" className="shadow-lg">
            <EnterIcon className="h-4 w-4" />
          </Button>
        </form>
        <Toaster />
        <div className="pt-2 w-72 sm:w-64 md:w-96 xl:w-96">
          <Card>
            <CardHeader>
              <div className="flex flex-row justify-between items-center">
                <CardTitle className="text-indigo-700">
                  shrt.com/bjyd45
                </CardTitle>

                <Button
                  type="submit"
                  className="shadow-md rounded-full bg-slate-200 hover:bg-sky-200"
                >
                  <CopyIcon className="h-3 w-3 text-black" />
                </Button>
              </div>

              <CardDescription>https://reddit.com</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="pt-2 w-72 sm:w-64 md:w-96 xl:w-96">
          <Card>
            <CardHeader>
              <div className="flex flex-row justify-between items-center">
                <CardTitle className="text-indigo-700">
                  shrt.com/bjyd45
                </CardTitle>

                <Button
                  type="submit"
                  className="shadow-md rounded-full bg-slate-200 hover:bg-sky-200"
                >
                  <CopyIcon className="h-3 w-3 text-black" />
                </Button>
              </div>

              <CardDescription>https://reddit.com</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
