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
import VisitorModal from "../components/VisitorModal";
import ModalForm from "../components/ModalForm";

type DropDownProps = {
  onOpen: () => void;
};

export default function DropDown({ onOpen }: DropDownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm">
          <DotsVerticalIcon className="text-6xl text-black" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Static Actions">
        <DropdownItem key="edit" onClick={onOpen}>
          View Details
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete Link
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
