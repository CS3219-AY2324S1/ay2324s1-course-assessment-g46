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
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import { io } from "socket.io-client";

const matchApi =
  process.env.MATCHING_API_URL || "http://localhost:8080";

const socket = io(matchApi);
let timeout;

export default function Match(props) {
  const [isFindingMatch, setFindingMatch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("Easy");

  function find() {
    setFindingMatch(true);

    timeout = setTimeout(() => {
      cancelFind();
    }, 30000);

    socket.on("matchFound", (match) => {
      clearTimeout(timeout);
      props.setRoomName(match.roomName);
      props.setQuestionId(match.questionId);
      socket.disconnect();
      setFindingMatch(false);
    });

    socket.connect();

    socket.emit("findMatch", {
      socketId: socket.id,
      complexity: complexity,
      time: new Date().getTime()
    });
  }

  function cancelFind() {
    clearTimeout(timeout);
    socket.emit("cancel", socket.id);
    socket.disconnect();
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
                  <Select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </Select>
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
