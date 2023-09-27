import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
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
  Select,
} from "@chakra-ui/react";
import { Select as TagSelect } from "chakra-react-select";
import { MdOutlineEdit } from "react-icons/md";
import { questionCategories, updateQuestion } from "../../api/questionClient";

export default function EditQuestion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [complexity, setComplexity] = useState(props.complexity);

  const [missingTitle, setMissingTitle] = useState(false);
  const [missingDesc, setMissingDesc] = useState(false);
  const [missingCategory, setMissingCategory] = useState(false);

  const [repeatTitle, setRepeatTitle] = useState(false);
  const [repeatDesc, setRepeatDesc] = useState(false);

  useEffect(() => {
    let categoryFmt = props.category.map((c) => ({
      label: c,
      value: c,
    }));
    setCategory(categoryFmt);
    resetValidation();
  }, [isOpen]);

  async function submit(e) {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    const categories = category.map((c) => c.value);
    const question = {
      title: title,
      description: description,
      category: categories,
      complexity: complexity,
    };
    await updateQuestion(props._id, question);
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
    if (props.questions.filter((q) => q.title === title) > 1) {
      setMissingTitle(false);
      setRepeatTitle(true);
      valid = false;
    }
    if (props.questions.filter((q) => q.description === description) > 1) {
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

  return (
    <>
      <IconButton icon={<MdOutlineEdit />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Question</ModalHeader>
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
              <TagSelect
                isMulti
                options={questionCategories.map((c) => ({
                  value: c,
                  label: c,
                }))}
                value={category}
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
