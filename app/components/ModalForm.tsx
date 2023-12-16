/**
 * ModalForm component renders a modal dialog with a form
 * for creating a new shortened link.
 *
 * It uses React hooks and NextUI components to implement the modal,
 * and contains a FormInput component to handle submitting the form.
 *
 * When opened, it displays a modal dialog with a header, divider,
 * body containing the form, and triggers onClose when the form is submitted.
 */
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
