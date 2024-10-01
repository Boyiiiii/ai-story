import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
import React, { useEffect } from "react";

export const CustomLoader = ({ isLoading }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen();
  });
  return (
    <div>
      {" "}
      {isLoading && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <>
              <ModalBody className="p-10 flex w-full items-center justify-center">
                <Image
                  src={"/magic-book.gif"}
                  alt="loader"
                  width={300}
                  height={300}
                  className="w-[200px] h-[200px]"
                />
                <h2 className="font-bold text-2xl text-primary">
                  Please Wait....
                </h2>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
