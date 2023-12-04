/* eslint-disable react/prop-types */
/** @format */

import { Flex, ListItem, Icon } from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import Loader from "./Loader";
import {
  reducePositionOfSubsequentCard,
  swapCardData,
} from "../helper/helperFunctions";
import {
  deleteRowFromTable,
  getCardAndNextCardByPosition,
  getCardAndPrevCardByPosition,
  updateData,
} from "../googleSingIn/firebaseService";

function Card({
  listId,
  cards,
  list,
  cardId,
  boardId,
  title,
  cardPosition,
  cardslength,
  listData,
  listsLength,
  listPosition,
  onFetchData,
}) {
  const [isLoading, setIsLoading] = useState(false);

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
      await onFetchData();
    } catch (error) {
      console.error("Error moving card down:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      await onFetchData();
    } catch (error) {
      console.error("Error moving card up:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToEditCard = () => {
    window.location = `/editCard/${boardId}/${listId}/${cardId}`;
  };

  const handleMoveCardRight = async (listPosition, cardPosition, cardId) => {
    try {
      setIsLoading(true);

      // Get the cards of the current list
      let cards = listData[listPosition - 1].cards;

      // Find the next list
      let nextList = listData.find(
        (list) => list.position === listPosition + 1
      );

      // Prepare data to update the card
      const dataToUpdate = {
        position: nextList.cards.length + 1,
        listId: nextList.listId,
      };

      // Update the card position and listId
      await updateData("card", cardId, dataToUpdate);

      // Reduce the position of subsequent cards in the current list
      await reducePositionOfSubsequentCard(cards, cardPosition);

      // Fetch updated data
      await onFetchData();
    } catch (error) {
      console.error("Error moving card right:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveCardLeft = async (listPosition, cardPosition, cardId) => {
    try {
      setIsLoading(true);

      // Get the cards of the current list
      let cards = listData[listPosition - 1].cards;

      // Find the previous list
      let prevList = listData.find(
        (list) => list.position === listPosition - 1
      );

      // Prepare data to update the card
      const dataToUpdate = {
        position: prevList.cards.length + 1,
        listId: prevList.listId,
      };

      // Update the card position and listId
      await updateData("card", cardId, dataToUpdate);

      // Reduce the position of subsequent cards in the current list
      await reducePositionOfSubsequentCard(cards, cardPosition);

      // Fetch updated data
      await onFetchData();
    } catch (error) {
      console.error("Error moving card left:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      cursor={"pointer"}
      bgColor={"#eee"}
      rounded={"md"}
      boxShadow="2xl"
      px={2}
      py={2}
      justifyContent="space-between"
      position={"relative"}
      overflow={"hidden"}
    >
      {isLoading && <Loader />}
      <ListItem
        onClick={handleRedirectToEditCard}
        wordBreak={"break-word"}
        width={"80%"}
      >
        {title}
      </ListItem>
      <Flex>
        {cardPosition !== 1 && (
          <ListItem>
            <Icon
              fontSize={"18px"}
              as={ArrowUpIcon}
              color="blue.500"
              cursor="pointer"
              onClick={() => handleMoveUpCard(cardPosition)}
            />
          </ListItem>
        )}

        {listsLength !== listPosition && (
          <ListItem>
            <Icon
              as={ArrowForwardIcon}
              fontSize={"18px"}
              color="blue.500"
              cursor="pointer"
              onClick={() =>
                handleMoveCardRight(listPosition, cardPosition, cardId)
              }
            />
          </ListItem>
        )}
        {cardslength !== cardPosition && (
          <ListItem>
            <Icon
              as={ArrowDownIcon}
              fontSize={"18px"}
              color="blue.500"
              cursor="pointer"
              onClick={() => handleMoveDownCard(cardPosition)}
            />
          </ListItem>
        )}
        {listPosition !== 1 && (
          <ListItem>
            <Icon
              as={ArrowBackIcon}
              fontSize={"18px"}
              color="blue.500"
              cursor="pointer"
              onClick={() =>
                handleMoveCardLeft(listPosition, cardPosition, cardId)
              }
            />
          </ListItem>
        )}
        <ListItem>
          <Icon
            as={DeleteIcon}
            ml={1}
            fontSize={"14px"}
            color="blue.500"
            cursor="pointer"
            onClick={() => handleDeleteCard(cardId, cardPosition)}
          />
        </ListItem>
      </Flex>
    </Flex>
  );
}

export default Card;
