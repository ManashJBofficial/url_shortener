import React from "react";

import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export default function DropDown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm">
          <DotsVerticalIcon className="text-6xl text-black" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Static Actions">
        <DropdownItem key="edit">View Link</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete Link
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
