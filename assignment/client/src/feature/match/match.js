import React, { useState, useEffect } from "react";

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
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

import Timer from "./timer";

import { io } from "socket.io-client";

const matchApi =
  process.env.MATCHING_API_URL || "http://localhost:8080";

let socket;
let timeout;
let identifier;

export default function Match(props) {
  const [isFindingMatch, setFindingMatch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("Easy");
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();

  function cleanUpSocket() {
    clearTimeout(timeout);
    socket.off("matchFound", matchFound);
    setFindingMatch(false);
  }

  useEffect(() => {
    socket = io(matchApi);
    identifier = Math.random().toString();
  }, [])

  function matchFound(match) {
    props.setRoomName(match.roomName);
    props.setQuestionId(match.questionId);
    cleanUpSocket();
  }

  function find() {
    setFindingMatch(true);

    timeout = setTimeout(() => {
      onAlertOpen();
      cancelFind();
    }, 30000);

    socket.on("matchFound", matchFound);

    socket.connect();

    socket.emit("findMatch", {
      socketId: socket.id,
      identifier: identifier,
      complexity: complexity,
      time: new Date().getTime()
    });
  }

  function cancelFind() {
    socket.emit("cancel", identifier);
    cleanUpSocket();
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
                <Timer duration={30}/>
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
      <AlertDialog isOpen={isAlertOpen} onClose={onAlertClose}>
      <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              No match found
            </AlertDialogHeader>
            <AlertDialogFooter>
            <Button onClick={onAlertClose}>
              Ok
            </Button>
          </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
