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
  HStack,
  Tag,
  Divider,
  Stack,
  Center,
} from "@chakra-ui/react";

export default function ReadQuestion(props) {
  const { id, title, description, category, complexity, _id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  function attemptQuestion() {
    onClose();
    props.attemptQuestion(_id);
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
              <HStack spacing={4}>
                {props.category.length <= 3 ? (
                  props.category.map((c) => <Tag>{c}</Tag>)
                ) : (
                  <>
                    <Tag>{props.category[0]}</Tag>
                    <Tag>{props.category[1]}</Tag>
                    <Tag>{props.category.length - 2}+</Tag>
                  </>
                )}
              </HStack>
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
