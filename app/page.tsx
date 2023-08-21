import Image from "next/image";
import background from "../public/gradient.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 " style={{ zIndex: 0 }}>
        <Image
          src={background}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div
        className="absolute inset-0  bg-white opacity-60"
        style={{ zIndex: 0 }}
      ></div>

      <div className="flex flex-col h-screen items-center justify-center  z-10 md:px-10">
        <div className="flex items-center justify-center mx-4 p-8 mb-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            Url Shortener
          </h1>
        </div>

        <div className="flex flex-row w-full max-w-sm items-center justify-center space-x-2 px-5 sm:px-0 md:px-0 xl:px-0">
          <Input
            type="url"
            placeholder="Shorten your link"
            className="shadow-lg border-black"
            pattern="https://.*"
            title="Please enter a valid URL starting with 'https://'"
            required
          />
          <Button type="submit" className="shadow-lg">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
