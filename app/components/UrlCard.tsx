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
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import DropDown from "./DropDown";
import VisitorModal from "../components/VisitorModal";
import DeleteConfirm from "../components/DeleteConfirm";

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
  dropdown,
}: {
  data: UrlData;
  width: string;
  visibility: string;
  dropdown: string;
}) {
  const visitorModal = useDisclosure();
  const deleteModal = useDisclosure();

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
          <div className={dropdown}>
            <DropDown
              onOpen={visitorModal.onOpen}
              onDeleteOpen={deleteModal.onOpen}
            />
          </div>
          {/* <Button variant="light" size="sm" onPress={onOpen}>
            <DotsVerticalIcon className="text-6xl text-black" />
          </Button> */}
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
