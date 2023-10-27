import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export default function ReadQuestion(props) {
  const { question_id, id, title, description, category, complexity } = props;
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
            {id}. {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Wrap spacing={4}>
                {category == null ? (
                  <></>
                ) : (
                  category.map((c, i) => <Tag key={i}>{c}</Tag>)
                )}
              </Wrap>
              <Text color={getComplexity()}>{complexity}</Text>
              <Text>{description}</Text>
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
