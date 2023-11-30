/** @format */
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  Input,
  Flex,
  Image,
  Stack,
  Text,
  VStack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

function EditCardPopup({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Stack
            textAlign={"center"}
            p={3}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text color={"gray.800"} fontWeight={"bolder"}>
              ABhishek
            </Text>
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Input placeholder="Card Title" />
            <Textarea placeholder="Card Description" />
          </VStack>

          <Flex wrap="wrap" gap="2"></Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCardPopup;
