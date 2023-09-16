import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

export default function Match(props) {
  const [isFindingMatch, setFindingMatch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");

  function find() {
    setFindingMatch(true);
  }

  function cancelFind() {
    setFindingMatch(false);
  }

  return (
    <>
      <Button onClick={onOpen}>Collaborate</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Collaborate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isFindingMatch ? (
              <>
                <p>finding collaborator...</p>
                <Spinner />
              </>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input
                    placeholder="Last name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Complexity</FormLabel>
                  <Input
                    placeholder="Last name"
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {isFindingMatch ? (
              <>
                <Button onClick={cancelFind}>Cancel</Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={find}>
                  Find
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
