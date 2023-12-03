/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */
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
  deleteRowFromTable,
  getCardAndNextCardByPosition,
  updateData,
  getCardAndPrevCardByPosition,
} from "../googleSingIn/firebaseService";
import {
  reducePositionOfSubsequentCard,
  swapCardData,
} from "../helper/helperFunctions";
import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

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

  // Move card up within the list
  const handleMoveUpCard = async (position) => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.error("Error moving card up:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Move card down within the list
  const handleMoveDownCard = async (position) => {
    try {
      setIsLoading(true);
      const swapEl = await getCardAndNextCardByPosition(
        "card",
        "position",
        position,
        "position",
        list.listId
      );
      swapCardData(swapEl);
      swapEl.forEach(async (el) => await updateData("card", el.cardId, el));
      onFetchData();
    } catch (error) {
      console.error("Error moving card down:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new card within the list
  const handleCreateCard = async () => {
    try {
      setIsLoading(true);
      if (!newCardTitle) {
        alert("Card title required.");
        return;
      }
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
      console.error("Error creating card:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a card from the list
  const handleDeleteCard = async (cardId, position) => {
    try {
      setIsLoading(true);
      await reducePositionOfSubsequentCard(cards, position);
      await deleteRowFromTable("card", cardId);
      onFetchData();
    } catch (error) {
      console.error("Error deleting card:", error.message);
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
            pt={2}
            pb={1}
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
              textAlign={"center"}
              color={"gray.800"}
              wordBreak={"break-word"}
              fontWeight={"bolder"}
              width={"60%"}
              p={2}
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
