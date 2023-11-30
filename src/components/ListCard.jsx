/** @format */
import { useEffect, useState } from "react";
import Card from "./Card";
import CreateNewCard from "./CreateNewCard";
import EditCardPopup from "./EditCardPopup";
import {
  createData,
  getAllById,
  deleteRowFromTable,
} from "../googleSingIn/firebaseService";
import {
  Center,
  Box,
  useColorModeValue,
  Stack,
  Text,
  List,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function ListCard({ listName, listId, onDeleteList }) {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");

  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  //

  const handleCreateCard = async () => {
    if (!newCardTitle) {
      alert("Card title required.");
      return;
    }
    const cardData = {
      listId: listId,
      title: newCardTitle,
      description: "",
      position: "",
    };
    await createData(cardData, "card");

    getCards();
    setNewCardTitle("");
  };

  const handleDeleteCard = async (cardId) => {
    console.log(cardId);
    await deleteRowFromTable("card", cardId);
    getCards();
  };

  const getCards = async () => {
    const listsArray = await getAllById("card", "listId", listId);
    setCards(listsArray);
  };

  useEffect(() => {
    getCards();
  }, [setCards]);

  return (
    <>
      {" "}
      <Center flexShrink={0} py={6} width={"260px"}>
        <Box
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"md"}
          boxShadow={"dark-lg"}
          overflow={"hidden"}
          bgColor={"#ccc"}
          position={"relative"}
        >
          <CloseButton
            position="absolute"
            top="1"
            right="1"
            color="black"
            width="20px"
            height="20px"
            bgColor="#aaa"
            zIndex="10"
            onClick={() => {
              onDeleteList(listId);
            }}
          />
          <Stack
            textAlign={"center"}
            p={3}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text color={"gray.800"} fontWeight={"bolder"}>
              {listName}
            </Text>
          </Stack>

          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            bgColor={"#ccc"}
            px={2}
            py={2}
          >
            <List spacing={2}>
              {cards.map((card) => (
                <Card
                  key={card.cardId}
                  cardId={card.cardId}
                  title={card.title}
                  onDeleteCard={handleDeleteCard}
                  onOpen={onOpen}
                />
              ))}

              <CreateNewCard
                newCardTitle={newCardTitle}
                setNewCardTitle={setNewCardTitle}
                onCreateCard={handleCreateCard}
              />
            </List>
          </Box>
        </Box>
      </Center>
      <EditCardPopup isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ListCard;
