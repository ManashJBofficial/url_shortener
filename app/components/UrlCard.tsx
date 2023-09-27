import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { StarIcon } from "@radix-ui/react-icons";
import DropDown from "./DropDown";

type UrlData = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};

export default function UrlCard({ data }: { data: UrlData }) {
  return (
    <div className="pb-3 ">
      <Card className="width p-2 cursor-pointer">
        <CardHeader className="flex justify-between items-center gap-5">
          <div className="flex gap-5 items-center">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md text-sky-900 font-bold">
                shor.ty/{data?.short_code}
              </p>
              <p className="text-small text-default-500 ">
                <span className="text-default-500 hover:underline">
                  {data?.long_url}
                </span>
              </p>
            </div>
          </div>
          <DropDown />
        </CardHeader>
      </Card>
    </div>
  );
}
