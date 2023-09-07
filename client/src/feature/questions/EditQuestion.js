import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineEdit } from "react-icons/md";

export default function EditQuestion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(props.title);
  const [question, setQuestion] = useState(props.question);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [complexity, setComplexity] = useState(props.complexity);

  function submit() {}

  return (
    <>
      <IconButton icon={<MdOutlineEdit />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Question</FormLabel>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Complexity</FormLabel>
              <Input
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
