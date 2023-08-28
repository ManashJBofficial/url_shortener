"use client";

import { useState } from "react";
import Image from "next/image";
import background from "../public/gradient.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnterIcon } from "@radix-ui/react-icons";
import { submitForm } from "./serverComponents/formHandler";
import { redirect } from "next/navigation";

const Page = () => {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = async (formData: FormData) => {
    try {
      const longUrl = formData.get("long_url");

      const generateRandomString = (length: number): string => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      };

      const response = await submitForm({
        long_url: longUrl,
        short_code: generateRandomString(6),
      });

      if (response.status === 200) {
        setMessage("success");
        redirect("/");
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
          action={handleSubmit}
          className="flex flex-row w-full max-w-sm items-center justify-center space-x-2 px-5 sm:px-0 md:px-0 xl:px-0"
        >
          <Input
            type="url"
            placeholder="Shorten your link"
            className="shadow-lg border-black"
            name="long_url"
            pattern="https://.*"
            title="Please enter a valid URL starting with 'https://'"
            required
          />
          <Button type="submit" className="shadow-lg">
            <EnterIcon className="h-4 w-4" />
          </Button>
        </form>
        {message ? <span>{message}</span> : null}
      </div>
    </div>
  );
};

export default Page;
