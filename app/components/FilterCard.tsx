import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "../../lib/utils/SearchIcon";

export default function FilterCard() {
  return (
    <Card className="max-w-[340px] p-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <h4>Filter Links</h4>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 pb-5">
        <Input
          id="filtercard-id"
          isClearable
          radius="lg"
          classNames={{
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-md",
              "bg-default-200/50",
              "dark:bg-default/60",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </CardBody>
    </Card>
  );
}
