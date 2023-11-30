/** @format */
import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { UserAuth } from "../googleSingIn/AuthContext";
import BoardCard from "./BoardCard";
import {
  Container,
  Flex,
  Card,
  CardBody,
  Stack,
  Image,
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
import {
  getAllById,
  createData,
  deleteRowFromTable,
} from "../googleSingIn/firebaseService";

function Board() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boards, setBoards] = useState([]);

  const { user } = UserAuth();
  const userUid = user.uid;

  const [boardTitle, setBoardTitle] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [defaultBackgrounds] = useState([
    "https://t4.ftcdn.net/jpg/05/72/54/67/360_F_572546714_2mn39TUv2f5Lmg7JRT9yvSkuTJERGyg8.jpg",
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/006/240/302/small/abstract-soft-focus-sunset-field-landscape-of-yellow-flowers-and-grass-meadow-warm-golden-hour-sunset-sunrise-time-tranquil-spring-summer-nature-closeup-and-blurred-forest-background-idyllic-nature-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/001/838/464/small/golden-black-premium-background-free-vector.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6WkUKD5tTM0w5tADvwSiRdw2_zvrSo3P_A&usqp=CAU",
    "https://t4.ftcdn.net/jpg/05/49/86/39/360_F_549863991_6yPKI08MG7JiZX83tMHlhDtd6XLFAMce.jpg",
  ]);

  const handleSelectBackground = (url) => {
    setBackgroundUrl(url);
  };

  const handleDeleteBoard = async (boardId) => {
    await deleteRowFromTable("board", boardId);
    await getBoards();
  };

  const getBoards = async () => {
    if (userUid) {
      const boardsArray = await getAllById("board", "uid", userUid);
      setBoards(boardsArray);
    }
  };

  const handleCreateBoard = async () => {
    if (!boardTitle || !backgroundUrl) {
      alert("Board title and background URL are required.");
      return;
    }

    const boardData = {
      title: boardTitle,
      bgImg: backgroundUrl,
      uid: userUid,
    };

    if (userUid) {
      await createData(boardData, "board");
    }
    await getBoards();
    onClose();
    setBoardTitle("");
    setBackgroundUrl("");
  };

  useEffect(() => {
    getBoards();
  }, [user]);

  return (
    <Container maxW="8xl" bg="blue.600" minH="100vh" centerContent>
      <Container p="8" bg="blue.600" color="black" maxW="7xl">
        <SectionHeader text="Your Boards" />

        <Flex gap="4" wrap="wrap" marginTop="16px">
          {boards.map((board) => (
            <BoardCard
              key={board.boardId}
              title={board.title}
              bgImg={board.bgImg}
              // boardId={board.boardId}
              boardId={board.boardId}
              onDeleteBoard={handleDeleteBoard}
            />
          ))}
          {/* New card for creating a new board */}
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
            <Button colorScheme="blue" mr={3} onClick={handleCreateBoard}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Board;
