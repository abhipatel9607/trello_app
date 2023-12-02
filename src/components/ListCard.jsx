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
  list,
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
import { swapCardData } from "../helper/helperFunctions";

// eslint-disable-next-line react/prop-types
function ListCard({
  boardId,
  listName,
  listId,
  lists,
  onGetList,
  onDeleteList,
  listsLength,
  listPosition,
  onShiftListLeft,
  onShiftListRight,
}) {
  const [cards, setCards] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const { setIsLoading } = LoadContext();
  console.log(cards);
  const handleMoveUpCard = async (position) => {
    const swapEl = await getCardAndPrevCardByPosition(
      "card",
      "position",
      position,
      "position",
      listId
    );

    swapCardData(swapEl);
    swapEl.forEach(async (el) => await updateData("card", el.cardId, el));
    getCards();
  };
  const handleMoveDownCard = async (position) => {
    const swapEl = await getCardAndNextCardByPosition(
      "card",
      "position",
      position,
      "position",
      listId
    );
    console.log(swapEl);
    swapCardData(swapEl);
    swapEl.forEach(async (el) => await updateData("card", el.cardId, el));
    getCards();
  };

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
        position: cards.length + 1,
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

  const handleDeleteCard = async (cardId, position) => {
    try {
      setIsLoading(true);
      if (cards[position]) {
        const newCard = cards.slice(position);
        newCard.forEach(async (card) => {
          const id = card.cardId;
          const newPosition = card.position - 1;
          await updateData("card", id, { position: newPosition });
        });
      }
      await deleteRowFromTable("card", cardId);
      getCards();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function getCards() {
    try {
      setIsLoading(true);
      const listsArray = await getAllById("card", "listId", listId, "position");
      setCards(listsArray);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleMoveCardRight = async (position, cardId) => {
    setIsLoading(true);
    let cardData = cards.find((card) => card.cardId === cardId);
    let nextList = lists.find((list) => list.position === position + 1);
    const nextListCards = await getAllById(
      "card",
      "listId",
      nextList.listId,
      "position"
    );
    const newCardData = {
      listId: nextList.listId,
      position: nextListCards.length + 1,
      title: cardData.title,
      description: cardData.description,
    };
    await createData(newCardData, "card");
    await deleteRowFromTable("card", cardId);
    onGetList();
    setIsLoading(true);

    // window.location.reload();
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
            top="0"
            right="0"
            color="black"
            width="20px"
            height="20px"
            zIndex="10"
            onClick={() => {
              onDeleteList(listId, listPosition);
            }}
          />

          <Flex
            align={"center"}
            justify={"center"}
            color={useColorModeValue("gray.800", "white")}
            pt={6}
            pb={6}
          >
            {listPosition !== 1 && (
              <Icon
                as={ChevronLeftIcon}
                fontSize={"24px"}
                color="blue.500"
                cursor="pointer"
                onClick={() => onShiftListLeft(listPosition)}
              />
            )}

            <Text
              color={"gray.800"}
              wordBreak={"break-word"}
              fontWeight={"bolder"}
            >
              {listName}
            </Text>
            {listPosition !== listsLength && (
              <Icon
                as={ChevronRightIcon}
                fontSize={"24px"}
                color="blue.500"
                cursor="pointer"
                onClick={() => onShiftListRight(listPosition)}
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
                    listId={listId}
                    cardId={card.cardId}
                    boardId={boardId}
                    title={card.title}
                    onDeleteCard={handleDeleteCard}
                    cardPosition={card.position}
                    cardslength={cards.length}
                    listsLength={listsLength}
                    listPosition={listPosition}
                    onMoveUpCard={handleMoveUpCard}
                    onMoveDownCard={handleMoveDownCard}
                    onMoveCardRight={handleMoveCardRight}
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
