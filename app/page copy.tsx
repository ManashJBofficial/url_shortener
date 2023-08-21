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
        className="absolute inset-0  bg-white opacity-50"
        style={{ zIndex: 1 }}
      ></div>

      <div className="flex flex-col h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center justify-center mx-4 p-8 mb-4">
          <h1 className="text-6xl font-bold mb-8 text-black">Url Shortener</h1>
        </div>

        <div className="flex items-center justify-center   mx-4 p-8">
          <div className=" relative z-10 bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="mx-auto max-w-md">
              <div className="divide-y divide-gray-300/50">
                <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                  <div className="pt-8 text-base font-semibold leading-7">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input type="url" placeholder="Shorten your link" />
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
