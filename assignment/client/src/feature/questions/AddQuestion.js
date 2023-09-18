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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { addQuestion, getLastQuestionId } from "../../api/questionClient";

export default function AddQuestion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");

  useEffect(() => {
    setId(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setComplexity("");
    getLastQuestionId().then((id) => setId(id + 1));
  }, []);

  async function submit() {
    const categories = category.split(",");
    const question = {
      id: id,
      title: title,
      description: description,
      category: categories,
      complexity: complexity,
    };
    console.log(question);
    await addQuestion(question);
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>Add Question</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Id</FormLabel>
              <Input
                placeholder="Id"
                value={id}
                onChange={(e) => setId(e.target.id)}
                isReadOnly={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isRequired={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isRequired={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                isRequired={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Complexity</FormLabel>
              <Input
                placeholder="Complexity"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                isRequired={true}
                isInvalid={
                  complexity !== "" &&
                  complexity.toLowerCase() !== "easy" &&
                  complexity.toLowerCase() !== "medium" &&
                  complexity.toLowerCase() !== "hard"
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <FormControl>
              <Button colorScheme="blue" mr={3} onClick={submit} type="submit">
                Save
              </Button>
            </FormControl>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
