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

  const handleShiftListLeft = async (position) => {
    const swapEl = await getListAndPrevListByPosition(
      "list",
      "position",
      position,
      "position"
    );
    const swapData = swapEl.filter((el) => el.boardId === boardId);

    const swapedData = swapListData(swapData);
    swapedData.forEach(async (el) => await updateData("list", el.listId, el));
    await fetchData();
  };

  const handleShiftListRight = async (position) => {
    const swapEl = await getListAndNextListByPosition(
      "list",
      "position",
      position,
      "position",
      boardId
    );
    swapListData(swapEl);
    swapEl.forEach(async (el) => await updateData("list", el.listId, el));
    await fetchData();
  };

  const handleCreateList = async () => {
    try {
      if (!newListTitle) {
        alert("List title required.");
        return;
      }

      setIsLoading(true);

      const newListData = {
        title: newListTitle,
        boardId: boardId,
        position: listData.length + 1,
      };
      await createData(newListData, "list");
      await fetchData();
      setNewListTitle("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteList = async (listId, position) => {
    try {
      setIsLoading(true);

      await reducePositionOfSubsequentList(listData, position);

      await deleteRowFromTable("list", listId);
      fetchData();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const listsArray = await getAllById(
        "list",
        "boardId",
        boardId,
        "position"
      );

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

      setListData(listWithCards);
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveCardRight = async (listPosition, cardPosition, cardId) => {
    setIsLoading(true);

    let cards = listData[listPosition - 1].cards;
    let nextList = listData.find((list) => list.position === listPosition + 1);
    const dataToUpdate = {
      position: nextList.cards.length + 1,
      listId: nextList.listId,
    };
    await updateData("card", cardId, dataToUpdate);

    await reducePositionOfSubsequentCard(cards, cardPosition);

    await fetchData();

    setIsLoading(false);
  };
  const handleMoveCardLeft = async (listPosition, cardPosition, cardId) => {
    setIsLoading(true);
    let cards = listData[listPosition - 1].cards;
    let prevList = listData.find((list) => list.position === listPosition - 1);
    const dataToUpdate = {
      position: prevList.cards.length + 1,
      listId: prevList.listId,
    };
    await updateData("card", cardId, dataToUpdate);

    await reducePositionOfSubsequentCard(cards, cardPosition);

    await fetchData();

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, setIsLoading]);

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
