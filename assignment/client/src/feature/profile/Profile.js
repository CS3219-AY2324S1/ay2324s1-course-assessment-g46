import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
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
import { useAuth } from "../../context/AuthProvider";

export default function Profile(props) {
  const INVALID_GOAL_LENGTH = "Please make sure your goal has no more than 100 characters";
  const { isOpen: isOpenFirstModal, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();
  const { isOpen: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();

  const { session } = useAuth();
  const [fullName, setFullName] = useState("");
  const [goal, setGoal] = useState("");

  const getPersonalInfo = async () => {
    const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id);

    if (data.length != 0) {
      setFullName(data[0].full_name)
      setGoal(data[0].goal)
    }
  }

  useEffect(() => {
    getPersonalInfo();
  }, [])

  async function updateProfile(e) {
    e.preventDefault();

    const { data, error } = await supabase
    .from('profiles')
    .update({ 
        full_name: fullName, 
        goal: goal 
    })
    .eq('id', session.user.id)
    .select();

    if (error) {
        alert(INVALID_GOAL_LENGTH);
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
                updateProfile(e); 
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
