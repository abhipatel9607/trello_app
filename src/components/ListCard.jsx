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
} from "@chakra-ui/react";
import Card from "./Card";
import CreateNewCard from "./CreateNewCard";
import {
  createData,
  deleteRowFromTable,
  updateData,
  getListAndPrevListByPosition,
  getListAndNextListByPosition,
} from "../googleSingIn/firebaseService";
import {
  reducePositionOfSubsequentList,
  swapListData,
} from "../helper/helperFunctions";
import { useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import Loader from "./Loader";

function ListCard({ list, listsLength, boardId, listData, onFetchData }) {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateNewCardLoading, setIsCreateNewCardLoading] = useState(false);

  const cards = list.cards;

  // Delete a list
  const handleDeleteList = async (listId, position) => {
    try {
      setIsLoading(true);

      // Update positions of subsequent lists
      await reducePositionOfSubsequentList(listData, position);

      // Delete the list
      await deleteRowFromTable("list", listId);

      // Fetch updated data
      await onFetchData();
    } catch (error) {
      console.error("Error deleting list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new card within the list
  const handleCreateCard = async () => {
    try {
      setIsCreateNewCardLoading(true);
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
      await onFetchData();
      setNewCardTitle("");
    } catch (error) {
      console.error("Error creating card:", error.message);
    } finally {
      setIsCreateNewCardLoading(false);
    }
  };

  // Shift list to the left
  const handleShiftListLeft = async (position) => {
    try {
      setIsLoading(true);

      // Get the previous list for swapping
      const swapEl = await getListAndPrevListByPosition(
        "list",
        "position",
        position,
        "position"
      );
      const swapData = swapEl.filter((el) => el.boardId === boardId);

      // Swap list positions
      const swapedData = swapListData(swapData);
      swapedData.forEach(async (el) => await updateData("list", el.listId, el));

      // Fetch updated data
      await onFetchData();
    } catch (error) {
      console.error("Error shifting list left:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Shift list to the right
  const handleShiftListRight = async (position) => {
    try {
      setIsLoading(true);

      // Get the next list for swapping
      const swapEl = await getListAndNextListByPosition(
        "list",
        "position",
        position,
        "position",
        boardId
      );

      // Swap list positions
      swapListData(swapEl);
      swapEl.forEach(async (el) => await updateData("list", el.listId, el));

      // Fetch updated data
      await onFetchData();
    } catch (error) {
      console.error("Error shifting list right:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Center flexShrink={0} width={"260px"}>
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
          {isLoading && <Loader />}
          <Icon
            as={DeleteIcon}
            fontSize={"15px"}
            color="blue.500"
            cursor="pointer"
            position="absolute"
            top="1"
            right="1"
            onClick={() => {
              handleDeleteList(list.listId, list.position);
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
                onClick={() => handleShiftListLeft(list.position)}
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
                onClick={() => handleShiftListRight(list.position)}
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
                    cards={cards}
                    list={list}
                    listId={list.listId}
                    cardId={card.cardId}
                    boardId={boardId}
                    title={card.title}
                    listData={listData}
                    onFetchData={onFetchData}
                    cardPosition={card.position}
                    cardslength={cards.length}
                    listsLength={listsLength}
                    listPosition={list.position}
                  />
                ))}

              <CreateNewCard
                isCreateNewCardLoading={isCreateNewCardLoading}
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
