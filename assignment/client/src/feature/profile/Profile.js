import React, { useEffect, useState } from "react";
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
  MenuItem,
  Textarea,
} from "@chakra-ui/react";
import { getProfile, updateProfile } from "../../api/userClient";

export default function Profile(props) {
  const { isOpen: isOpenFirstModal, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();
  const { isOpen: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();

  const token = localStorage.getItem("token")
  const [fullName, setFullName] = useState("");
  const [newName, setNewName] = useState("");
  const [goal, setGoal] = useState("");
  const [newGoal, setNewGoal] = useState("");

  const getPersonalInfo = async () => {
    // Fetch user here 
    const { data, error } = await getProfile(token)
    if (error != null) {
      alert(error.message)
    } else {
      setFullName(data.fullName)
      setGoal(data.goal)
    }
  }

  useEffect(() => {
    getPersonalInfo();
  }, [])

  async function updateUser(e) {
    e.preventDefault();
    const { data, error } = await updateProfile({fullName: newName, goal: newGoal}, token)
    if (error != null) {
      alert(error.message)
    } else {
      getPersonalInfo();
    }
  }

  return (
    <>
      <MenuItem onClick={onOpenFirstModal}>Profile</MenuItem>
      <Modal isOpen={isOpenFirstModal} onClose={onCloseFirstModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder={fullName}
                isReadOnly={true}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Goal</FormLabel>
              <Textarea
                placeholder={goal}
                isReadOnly={true}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onOpenSecondModal}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenSecondModal} onClose={onCloseSecondModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Goal</FormLabel>
              <Textarea
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                updateUser(e); 
                onCloseSecondModal();
            }}
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
