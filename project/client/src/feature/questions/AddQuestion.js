import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Select as TagSelect } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import {
  addQuestion,
  getFirstMissingQuestionId,
  getLastQuestionId,
  questionCategories,
} from "../../api/questionClient";

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

  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    resetForm();
    resetValidation();
  }, [isOpen]);

  async function submit(e) {
    if (!validate()) {
      e.preventDefault();
      return;
    }

    const categories = category.map((c) => c.value);

    try {
      await addQuestion(id, title, description, categories, complexity);
      onClose();
      props.updateQuestionsList();
    } catch (error) {
      console.log(error);
      setApiError(true);
    }
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
    setApiError(false);
  }

  function resetForm() {
    setId(-1);
    setTitle("");
    setDescription("");
    setCategory([]);
    setComplexity("Easy");
    getFirstMissingQuestionId().then((id) => setId(id));
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="twitter">
        Add Question
      </Button>
      <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={15}>
              <Card>
                <CardHeader>
                  <Heading size={"xl"}>Input</Heading>
                </CardHeader>
                <CardBody>
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
                    <Textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      isRequired={true}
                      h={"300px"}
                    />
                    {missingDesc && (
                      <FormErrorMessage>
                        Description is required.
                      </FormErrorMessage>
                    )}
                    {repeatDesc && (
                      <FormErrorMessage>
                        Description already exists
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={missingCategory}>
                    <FormLabel>Category</FormLabel>
                    <TagSelect
                      isMulti
                      options={questionCategories.map((c) => ({
                        value: c,
                        label: c,
                      }))}
                      onChange={setCategory}
                    />
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
                  <FormControl isInvalid={apiError}>
                    {apiError && (
                      <FormErrorMessage>
                        Server encountered error adding question
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading>Preview</Heading>
                </CardHeader>
                <CardBody>
                  <Text as="b" fontSize={"xl"}>
                    {title ? title : "Question title"}
                  </Text>
                  <Markdown>
                    {description ? description : "Question description"}
                  </Markdown>
                </CardBody>
              </Card>
            </SimpleGrid>
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
