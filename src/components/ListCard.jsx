/** @format */
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Center,
  Box,
  useColorModeValue,
  Flex,
  Icon,
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
  getCardAndNextCardByPosition,
  updateData,
  getCardAndPrevCardByPosition,
} from "../googleSingIn/firebaseService";
import {
  reducePositionOfSubsequentCard,
  swapCardData,
} from "../helper/helperFunctions";

// eslint-disable-next-line react/prop-types
function ListCard({
  list,
  listsLength,
  boardId,
  onFetchData,
  onDeleteList,
  onShiftListLeft,
  onShiftListRight,
  onMoveCardRight,
  onMoveCardLeft,
}) {
  const [newCardTitle, setNewCardTitle] = useState("");
  const { setIsLoading } = LoadContext();
  const cards = list.cards;

  const handleMoveUpCard = async (position) => {
    const swapEl = await getCardAndPrevCardByPosition(
      "card",
      "position",
      position,
      "position",
      list.listId
    );
    swapCardData(swapEl);
    swapEl.forEach(async (el) => await updateData("card", el.cardId, el));
    onFetchData();
  };

  const handleMoveDownCard = async (position) => {
    const swapEl = await getCardAndNextCardByPosition(
      "card",
      "position",
      position,
      "position",
      list.listId
    );
    console.log(swapEl);
    swapCardData(swapEl);
    swapEl.forEach(async (el) => await updateData("card", el.cardId, el));
    onFetchData();
  };

  const handleCreateCard = async () => {
    try {
      if (!newCardTitle) {
        alert("Card title required.");
        return;
      }
      setIsLoading(true);
      const cardData = {
        listId: list.listId,
        title: newCardTitle,
        description: "",
        position: cards.length + 1,
      };
      await createData(cardData, "card");

      onFetchData();
      setNewCardTitle("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId, position) => {
    try {
      setIsLoading(true);
      await reducePositionOfSubsequentCard(cards, position);
      await deleteRowFromTable("card", cardId);
      onFetchData();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            top="0"
            right="0"
            color="black"
            width="20px"
            height="20px"
            zIndex="10"
            onClick={() => {
              onDeleteList(list.listId, list.position);
            }}
          />

          <Flex
            align={"center"}
            justify={"center"}
            color={useColorModeValue("gray.800", "white")}
            pt={6}
            pb={6}
          >
            {list.position !== 1 && (
              <Icon
                as={ChevronLeftIcon}
                fontSize={"24px"}
                color="blue.500"
                cursor="pointer"
                onClick={() => onShiftListLeft(list.position)}
              />
            )}

            <Text
              color={"gray.800"}
              wordBreak={"break-word"}
              fontWeight={"bolder"}
            >
              {list.title}
            </Text>
            {list.position !== listsLength && (
              <Icon
                as={ChevronRightIcon}
                fontSize={"24px"}
                color="blue.500"
                cursor="pointer"
                onClick={() => onShiftListRight(list.position)}
              />
            )}
          </Flex>

          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            bgColor={"#ccc"}
            px={2}
            py={2}
          >
            <List spacing={2}>
              {cards &&
                cards.map((card) => (
                  <Card
                    key={card.cardId}
                    listId={list.listId}
                    cardId={card.cardId}
                    boardId={boardId}
                    title={card.title}
                    cardPosition={card.position}
                    cardslength={cards.length}
                    listsLength={listsLength}
                    listPosition={list.position}
                    onDeleteCard={handleDeleteCard}
                    onMoveUpCard={handleMoveUpCard}
                    onMoveDownCard={handleMoveDownCard}
                    onMoveCardRight={onMoveCardRight}
                    onMoveCardLeft={onMoveCardLeft}
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
