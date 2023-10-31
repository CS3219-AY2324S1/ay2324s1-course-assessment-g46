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
  Tag,
  Stack,
  Center,
  Wrap,
} from "@chakra-ui/react";
import Markdown from "react-markdown";

export default function ReadQuestion(props) {
  const { title, description, category, complexity, question_id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  function attemptQuestion() {
    onClose();
    props.attemptQuestion(question_id);
  }

  function getComplexity() {
    if (complexity === "Easy") {
      return "green";
    }
    if (complexity === "Medium") {
      return "tomato";
    }
    if (complexity === "Hard") {
      return "red";
    }
  }

  return (
    <>
      <Text
        onClick={onOpen}
        _hover={{
          textDecoration: "underline",
          cursor: "pointer ",
          color: "blue",
        }}
      >
        {title}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Wrap spacing={4}>
                {category == null ?
                <></>
                : category.map((c, i) => (
                  <Tag key={i}>{c}</Tag>
                ))}
              </Wrap>
              <Text color={getComplexity()}>{complexity}</Text>
              <Markdown>{description}</Markdown>
            </Stack>
          </ModalBody>

          <Center>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={attemptQuestion}>
                Attempt
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}
