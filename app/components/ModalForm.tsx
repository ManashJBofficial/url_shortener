import React, { useCallback } from "react";

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

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
        // isDismissable={false}
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
                <div className="flex justify-center ">
                  <FormInput onSuccessSubmit={handleCloseModal} />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
