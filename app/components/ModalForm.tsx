import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { EnterIcon } from "@radix-ui/react-icons";
import { Divider } from "@nextui-org/react";
import { Link1Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "@/lib/utils/PulseIcon";
import { FormInput } from "./FormInput";

export default function ModalForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="sm"
        endContent={<PlusIcon />}
        id="modal-trigger-button"
      >
        Create Link
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isDismissable={false}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a new link
              </ModalHeader>
              <Divider className="" />
              <ModalBody>
                {/* <Input
                  isRequired
                  isClearable
                  id="input_id"
                  type="url"
                  name="long_url"
                  // value={longUrl}
                  // onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="Shorten your link"
                  aria-describedby="text-input"
                  startContent={
                    <Link1Icon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  // onClear={() => setLongUrl("")}
                  radius="sm"
                /> */}
                <div className="flex justify-center ">
                  <FormInput />
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} radius="sm">
                  Create Link
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
