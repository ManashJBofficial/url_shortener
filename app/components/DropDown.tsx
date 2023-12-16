/**
 * DropDown component renders a dropdown menu with "View Details"
 * and "Delete Link" options. It takes two callback props -
 * onOpen and onDeleteOpen - which are invoked when the respective
 * menu items are clicked.
 */
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

type DropDownProps = {
  onOpen: () => void;
  onDeleteOpen: () => void;
};

export default function DropDown({ onOpen, onDeleteOpen }: DropDownProps) {
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
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={onDeleteOpen}
        >
          Delete Link
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
