import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { addQuestion, getLastQuestionId } from "../../api/questionClient";

export default function AddQuestion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [complexity, setComplexity] = useState("Easy");

  const [missingTitle, setMissingTitle] = useState(false);
  const [missingDesc, setMissingDesc] = useState(false);
  const [missingCategory, setMissingCategory] = useState(false);

  const [repeatTitle, setRepeatTitle] = useState(false);
  const [repeatDesc, setRepeatDesc] = useState(false);

  const categories = [
    "Array",
    "Binary Search",
    "Binary Tree",
    "Dynamic Programming",
    "Graph",
    "Hash Table",
    "Heap",
    "Linked List",
    "Matrix",
    "Recursion",
    "Stack",
    "String",
    "Trie",
  ];

  function addCategory(c) {
    setCategory((current) => [...current, c]);
  }

  useEffect(() => {
    resetForm();
    resetValidation();
  }, [isOpen]);

  async function submit(e) {
    if (!validate()) {
      e.preventDefault();
      return;
    }
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
    props.updateQuestionsList();
  }

  function validate() {
    resetValidation();
    let valid = true;
    if (title === "") {
      setMissingTitle(true);
      setRepeatTitle(false);
      valid = false;
    }
    if (description === "") {
      setMissingDesc(true);
      setRepeatDesc(false);
      valid = false;
    }
    if (category.length === 0) {
      setMissingCategory(true);
      valid = false;
    }
    if (props.questions.some((q) => q.title === title)) {
      setMissingTitle(false);
      setRepeatTitle(true);
      valid = false;
    }
    if (props.questions.some((q) => q.description === description)) {
      setMissingDesc(false);
      setRepeatDesc(true);
      valid = false;
    }
    return valid;
  }

  function resetValidation() {
    setMissingTitle(false);
    setRepeatTitle(false);
    setMissingDesc(false);
    setRepeatDesc(false);
    setMissingCategory(false);
  }

  function resetForm() {
    setId(-1);
    setTitle("");
    setDescription("");
    setCategory([]);
    setComplexity("Easy");
    getLastQuestionId().then((id) => setId(id + 1));
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
            <FormControl isInvalid={missingTitle || repeatTitle}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isRequired={true}
              />
              {missingTitle && (
                <FormErrorMessage>Title is required.</FormErrorMessage>
              )}
              {repeatTitle && (
                <FormErrorMessage>Title already exists</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={missingDesc || repeatDesc}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isRequired={true}
              />
              {missingDesc && (
                <FormErrorMessage>Description is required.</FormErrorMessage>
              )}
              {repeatDesc && (
                <FormErrorMessage>Description already exists</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={missingCategory}>
              <FormLabel>Category</FormLabel>
              {/* <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                isRequired={true}
              /> */}
              <Box>
                {category.map((c) => (
                  <Tag>{c}</Tag>
                ))}
              </Box>
              <Select
                value={category.join(",")}
                onChange={(e) => addCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </Select>
              {missingCategory && (
                <FormErrorMessage>
                  At least 1 category is required.
                </FormErrorMessage>
              )}
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
          </ModalBody>
          <ModalFooter>
            <FormControl>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={(e) => submit(e)}
                type="submit"
              >
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
