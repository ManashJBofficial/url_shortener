import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
} from "@nextui-org/react";
import { getShortUrlVisitor } from "../serverAction/getShortUrlVisitor";

type UrlData = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};
interface VisitorModalProps {
  onClose: () => void;
  data: UrlData;
}

export default function VisitorModal({ onClose, data }: VisitorModalProps) {
  const [visitdata, setVisitData] = useState<
    Array<{
      visit_count: number;
      devices: string[];
      locations: string[];
      browsers: string[];
    }>
  >([]);

  useEffect(() => {
    const getVisitorData = async () => {
      try {
        const res = await getShortUrlVisitor(data.short_code);
        setVisitData((prevVisitData) => [...prevVisitData, res]); // Append the new data to the array.
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };
    getVisitorData();
  }, [data.short_code]);

  return (
    <>
      <Modal
        isOpen={true}
        onOpenChange={onClose}
        backdrop="blur"
        size="xl"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                {visitdata.map((e, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardBody className="overflow-y-auto max-h-36">
                        <h1 className="text-2xl font-bold">{e.visit_count}</h1>
                        <p className="text-gray-500">Visit Count</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="overflow-y-auto max-h-36">
                        <h1 className="text-2xl font-bold">Locations</h1>
                        {e.locations.length > 0 ? (
                          e.locations.map((location, index) => (
                            <p key={index} className="text-gray-500">
                              {location}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-500">No data available</p>
                        )}
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="overflow-y-auto max-h-36">
                        <h1 className="text-2xl font-bold">Devices</h1>
                        {e.devices.length > 0 ? (
                          e.devices.map((device, index) => (
                            <p key={index} className="text-gray-500">
                              {device}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-500">No data available</p>
                        )}
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="overflow-y-auto max-h-36">
                        <h1 className="text-2xl font-bold">Browsers</h1>
                        {e.devices.length > 0 ? (
                          e.browsers.map((browser, index) => (
                            <p key={index} className="text-gray-500">
                              {browser}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-500">No data available</p>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
