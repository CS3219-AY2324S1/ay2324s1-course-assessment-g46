import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";

export default function ReadQuestion(props) {
  const { id, title, description, category, complexity } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  function attemptQuestion() {
    onClose();
    props.attemptQuestion(id);
  }

  return (
    <>
      <Text
        onClick={onOpen}
        _hover={{ textDecoration: "underline", cursor: "pointer " }}
      >
        {title}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{category}</p>
            <p>{complexity}</p>
            <p>{description}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={attemptQuestion}>
              attempt
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
