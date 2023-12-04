/** @format */

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { UserAuth } from "../googleSingIn/AuthContext";
import BoardCard from "./BoardCard";
import { getAllById, createData } from "../googleSingIn/firebaseService";
import {
  Container,
  Flex,
  Card,
  CardBody,
  Stack,
  Image,
  Box,
  Heading,
  Divider,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import Loader from "./Loader";

function Board() {
  const [boards, setBoards] = useState(null);
  const [boardTitle, setBoardTitle] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBoardData, setIsLoadingBoardData] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = UserAuth();
  const userUid = user.uid;

  // Default Backgrounds URL
  const [defaultBackgrounds] = useState([
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1537819191377-d3305ffddce4?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1473654729523-203e25dfda10?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  // Select a background URL for the new board
  const handleSelectBackground = (url) => {
    setBackgroundUrl(url);
  };

  // Clear ErrorMessage State
  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  // Get all boards for the current user
  const getBoards = async () => {
    try {
      if (userUid) {
        setIsLoadingBoardData(true);
        const boardsArray = await getAllById(
          "board",
          "uid",
          userUid,
          "createdAt"
        );
        setBoards(boardsArray);
      }
    } catch (error) {
      console.error("Error getting boards:", error);
    } finally {
      setIsLoadingBoardData(false);
    }
  };

  // Create a new board
  const handleCreateBoard = async () => {
    try {
      if (!navigator.onLine) {
        setErrorMessage(
          "You are currently offline. Please check your network connection."
        );
        return;
      }
      if (!boardTitle || !backgroundUrl) {
        setErrorMessage("Board title and background URL are required.");
        return;
      }
      setIsLoading(true);

      const boardData = {
        title: boardTitle,
        bgImg: backgroundUrl,
        uid: userUid,
      };
      
      if (userUid) {
        await createData(boardData, "board");
      }

      await getBoards();
      setBoardTitle("");
      setBackgroundUrl("");
      clearErrorMessage();
      onClose();
    } catch (error) {
      console.error("Error creating board:", error);
      setErrorMessage("An error occurred. Please try again."); // Set error message on failure
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch boards when the component mounts or when the user changes
  useEffect(() => {
    getBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container maxW="8xl" bg="blue.600" minH="100vh" centerContent>
      {isLoadingBoardData && <Loader />}
      <Container p="8" bg="blue.600" color="black" maxW="7xl">
        <SectionHeader text="Your Boards" />
        <Flex gap="4" wrap="wrap" marginTop="16px">
          {/* Render Boards */}
          {boards &&
            boards.map((board) => (
              <BoardCard
                key={board.boardId}
                title={board.title}
                bgImg={board.bgImg}
                boardId={board.boardId}
                onGetBoards={getBoards}
              />
            ))}

          {/* Create a new board */}
          <Card
            maxW="xs"
            position="relative"
            height="150px"
            cursor="pointer"
            onClick={onOpen}
          >
            <Container borderRadius="lg" h="150px" width="250px"></Container>
            <CardBody
              position="absolute"
              top="0"
              p="4"
              w="100%"
              bg="rgba(0, 0, 0, 0.3)"
            >
              <Stack spacing="3" align="center" color="white">
                <Heading size="md">Create New Board</Heading>
              </Stack>
            </CardBody>
            <CardBody
              position="absolute"
              top="45%"
              p="4"
              w="100%"
              bg="rgba(0, 0, 0, 0)"
            >
              <Stack spacing="3" align="center" color="gray">
                <Heading size="md">Click me</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>
        </Flex>
      </Container>

      {/* Popup-Modal for adding title and background URL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {isLoading && <Loader />}
          <ModalHeader>Add New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Board Title"
              mb="4"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
            <Input
              placeholder="Custom Background URL"
              value={backgroundUrl}
              onChange={(e) => setBackgroundUrl(e.target.value)}
            />

            <Flex wrap="wrap" gap="2">
              {/* Render default background images */}
              {defaultBackgrounds.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt="Default Background"
                  borderRadius="lg"
                  width="100px"
                  height="70px"
                  cursor="pointer"
                  onClick={() => handleSelectBackground(url)}
                  mr="2"
                  mb="2"
                  mt="4"
                  border="2px solid black"
                  borderWidth={backgroundUrl === url ? "2px" : "0"}
                  borderColor={
                    backgroundUrl === url ? "black.100" : "transparent"
                  }
                />
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            {errorMessage && <Box color="red.500">{errorMessage}</Box>}
            <Button colorScheme="blue" mr={3} onClick={handleCreateBoard}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Board;
