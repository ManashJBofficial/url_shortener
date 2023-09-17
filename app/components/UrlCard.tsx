import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

const UrlCard = () => {
  return (
    <>
      <Card className="w-unit-80">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-base text-blue-800">localhost:3000/dsaweqw</p>
            <p className="text-small text-gray-700 hover:underline">
              https://reddit.com
            </p>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default UrlCard;
