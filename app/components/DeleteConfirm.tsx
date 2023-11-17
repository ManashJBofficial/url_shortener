import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { deleteLinks } from "../../redux/linkSlice";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { deleteLink } from "../serverAction/deleteLink";

type UrlData = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};

type DeleteConfirmProps = {
  onDelete: () => void;
  data: UrlData;
};

export default function DeleteConfirm({ onDelete, data }: DeleteConfirmProps) {
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    try {
      const res = await deleteLink(data.short_code);
      dispatch(deleteLinks(data.id));
      toast({
        description: "Link deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting short url:", error);
    }
  };

  return (
    <>
      <Modal isOpen={true} onOpenChange={onDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    deleteHandler(); // Invoke the function here
                    onClose(); // Close the modal after deleting
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
