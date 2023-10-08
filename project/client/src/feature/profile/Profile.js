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
  const INVALID_GOAL_LENGTH = "Please make sure your goal has no more than 100 characters";
  const { isOpen: isOpenFirstModal, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();
  const { isOpen: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();

  // const { token } = useAuth();
  const token = localStorage.getItem("token")
  const [fullName, setFullName] = useState("");
  const [goal, setGoal] = useState("");

  const getPersonalInfo = async () => {
    // Fetch user here 
    const res = await getProfile(token)
    if (res.hasOwnProperty("error")) {
      alert(res.error.message)
    } else {
      setFullName(res.data.fullName)
      setGoal(res.data.goal)
    }
  }

  useEffect(() => {
    getPersonalInfo();
  }, [])

  async function updateUser(e) {
    e.preventDefault();
    const res = await updateProfile({fullName: fullName, goal: goal}, token)
    if (res.hasOwnProperty("error")) {
      alert(res.error.message)
    } else {
      getPersonalInfo();
    }
    
    // Update profile here
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Goal</FormLabel>
              <Textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
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
