import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CheckIcon, CopyIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import DropDown from "./DropDown";
import VisitorModal from "../components/VisitorModal";
import DeleteConfirm from "../components/DeleteConfirm";
import { toast } from "@/components/ui/use-toast";

type UrlData = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};

export default function UrlCard({
  data,
  width,
  visibility,
  drop,
}: {
  data: UrlData;
  width: string;
  visibility: string;
  drop: boolean;
}) {
  const visitorModal = useDisclosure();
  const deleteModal = useDisclosure();

  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    // Show check icon immediately
    setCopied(true);

    // Logic to copy data.short_code to clipboard
    navigator.clipboard.writeText(
      `${process.env.BASE_URL}/${data?.short_code}`
    );
    toast({
      description: "Link copied successfully!",
    });
    // Revert back to copy icon after a short delay (e.g., 500 milliseconds)
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="pb-3 ">
      <Card className={`${width} p-2 cursor-pointer`}>
        <CardHeader className="flex justify-between items-center gap-5">
          <div className="flex gap-5 items-center">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
              className={visibility}
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
          <div className="flex items-center space-x-2">
            <button
              className="bg-gray-100 text-gray-800 p-2 rounded-full hover:bg-gray-400 "
              onClick={handleCopyClick}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
            {drop ? (
              <DropDown
                onOpen={visitorModal.onOpen}
                onDeleteOpen={deleteModal.onOpen}
              />
            ) : null}
          </div>
        </CardHeader>
      </Card>

      {/* Open the VisitorModal when isOpen is true */}
      {visitorModal.isOpen && (
        <VisitorModal onClose={visitorModal.onClose} data={data} />
      )}

      {/* Open the DeleteModal when isOpen is true */}
      {deleteModal.isOpen && (
        <DeleteConfirm onDelete={deleteModal.onClose} data={data} />
      )}
    </div>
  );
}
