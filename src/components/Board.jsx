/** @format */
import { useState } from "react";
import {
  Container,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  Flex,
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

function Board() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleSubmit = () => {
    // submission logic

    setBoardTitle("");
    onClose();
  };

  return (
    <Container maxW="8xl" bg="blue.600" minH="100vh" centerContent>
      <Container p="8" bg="blue.600" color="black" maxW="7xl">
        <Text color="white" fontSize="3xl" borderBottom="2px solid #999" p={2}>
          Your Boards
        </Text>

        <Flex gap="4" wrap="wrap" marginTop="16px">
          <Card maxW="xs" position="relative" height="150px" cursor="pointer">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Background_Img"
              borderRadius="lg"
              h="150px"
              width="250px"
              objectFit="cover"
            />

            <CardBody
              position="absolute"
              top="0"
              p="4"
              w="100%"
              bg="rgba(0, 0, 0, 0.1)"
            >
              <Stack spacing="3" align="center" color="white">
                <Heading size="md">Living room Sofa</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>

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
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
