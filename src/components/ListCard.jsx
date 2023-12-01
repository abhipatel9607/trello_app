/** @format */
import { useEffect, useState } from "react";
import {
  Center,
  Box,
  useColorModeValue,
  Stack,
  Text,
  List,
  CloseButton,
} from "@chakra-ui/react";
import { LoadContext } from "../helper/loderConfig";
import Card from "./Card";
import CreateNewCard from "./CreateNewCard";
import {
  createData,
  getAllById,
  deleteRowFromTable,
} from "../googleSingIn/firebaseService";

// eslint-disable-next-line react/prop-types
function ListCard({ boardId, listName, listId, onDeleteList }) {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const { setIsLoading } = LoadContext();

  const handleCreateCard = async () => {
    try {
      if (!newCardTitle) {
        alert("Card title required.");
        return;
      }
      setIsLoading(true);
      const cardData = {
        listId: listId,
        title: newCardTitle,
        description: "",
        position: "",
      };
      await createData(cardData, "card");

      getCards();
      setNewCardTitle("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      setIsLoading(true);
      await deleteRowFromTable("card", cardId);
      getCards();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCards = async () => {
    try {
      setIsLoading(true);
      const listsArray = await getAllById("card", "listId", listId);
      setCards(listsArray);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCards]);

  return (
    <>
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
                  listId={listId}
                  cardId={card.cardId}
                  boardId={boardId}
                  title={card.title}
                  onDeleteCard={handleDeleteCard}
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
    </>
  );
}

export default ListCard;
