/** @format */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import SectionHeader from "./SectionHeader";
import ListCard from "./ListCard";
import CreateNewList from "./CreateNewList";
import {
  createData,
  deleteRowFromTable,
  findById,
  getAllById,
  updateData,
  getListAndNextListByPosition,
  getListAndPrevListByPosition,
} from "../googleSingIn/firebaseService";
import { LoadContext } from "../helper/loderConfig";
import {
  reducePositionOfSubsequentCard,
  reducePositionOfSubsequentList,
  swapListData,
} from "../helper/helperFunctions";

function ListPage() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const { setIsLoading } = LoadContext();

  const [listData, setListData] = useState([]);
  console.log(listData);

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
      await fetchData();
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
      await fetchData();
    } catch (error) {
      console.error("Error shifting list right:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new list
  const handleCreateList = async () => {
    try {
      setIsLoading(true);

      // Validate input
      if (!newListTitle) {
        alert("List title required.");
        return;
      }

      // Prepare new list data
      const newListData = {
        title: newListTitle,
        boardId: boardId,
        position: listData.length + 1,
      };

      // Create the new list
      await createData(newListData, "list");

      // Fetch updated data
      await fetchData();
      setNewListTitle("");
    } catch (error) {
      console.error("Error creating list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a list
  const handleDeleteList = async (listId, position) => {
    try {
      setIsLoading(true);

      // Update positions of subsequent lists
      await reducePositionOfSubsequentList(listData, position);

      // Delete the list
      await deleteRowFromTable("list", listId);

      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Error deleting list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch all lists for the current board
      const listsArray = await getAllById(
        "list",
        "boardId",
        boardId,
        "position"
      );

      // Fetch cards for each list
      const listWithCards = await Promise.all(
        listsArray.map(async (list) => {
          const cardsOfList = await getAllById(
            "card",
            "listId",
            list.listId,
            "position"
          );
          list.cards = cardsOfList;
          return list;
        })
      );

      // Set the state with the fetched data
      setListData(listWithCards);
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setIsLoading(false);
    }
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
      await fetchData();
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
      await fetchData();
    } catch (error) {
      console.error("Error moving card left:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, setIsLoading]);

  // Fetch board details
  useEffect(() => {
    const getBoardDetail = async () => {
      try {
        setIsLoading(true);
        const data = await findById("board", boardId);
        setBoardData(data);
      } catch (error) {
        console.error("Error fetching board details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBoardDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  return (
    <Container
      maxW="8xl"
      bgImage={`url(${boardData ? boardData.bgImg : ""})`}
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      width={"100vw"}
      centerContent
    >
      <Container p="8" pl={4} color="black" width={"100vw"} maxW="7xl">
        <SectionHeader text={boardData ? boardData.title : "Loading..."} />
        <Flex
          gap="4"
          wrap="no-wrap"
          overflowX="auto"
          marginTop="16px"
          alignItems={"start"}
        >
          {listData.map((list) => (
            <ListCard
              key={list.listId}
              list={list}
              listsLength={listData.length}
              boardId={boardId}
              onFetchData={fetchData}
              onDeleteList={handleDeleteList}
              onShiftListLeft={handleShiftListLeft}
              onShiftListRight={handleShiftListRight}
              onMoveCardRight={handleMoveCardRight}
              onMoveCardLeft={handleMoveCardLeft}
            />
          ))}

          <CreateNewList
            newListTitle={newListTitle}
            setNewListTitle={setNewListTitle}
            onCreateList={handleCreateList}
          />
        </Flex>
      </Container>
    </Container>
  );
}

export default ListPage;
