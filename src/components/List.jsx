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
import { swapListData } from "../helper/helperFunctions";

function ListPage() {
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [boardData, setBoardData] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const { setIsLoading } = LoadContext();
  const listsLength = lists.length;

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
    await getList();
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
    await getList();
  };

  const handleCreateList = async () => {
    try {
      if (!newListTitle) {
        alert("List title required.");
        return;
      }

      setIsLoading(true);

      const listData = {
        title: newListTitle,
        boardId: boardId,
        position: listsLength + 1,
      };

      await createData(listData, "list");
      getList();
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
      if (lists[position]) {
        const newList = lists.slice(position);
        newList.forEach(async (list) => {
          const id = list.listId;
          const newPosition = list.position - 1;
          await updateData("list", id, {
            position: newPosition,
          });
        });
      }
      await deleteRowFromTable("list", listId);
      getList();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function getList() {
    try {
      setIsLoading(true);
      const listsArray = await getAllById(
        "list",
        "boardId",
        boardId,
        "position"
      );
      setLists(listsArray);
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLists]);

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
          {lists.map((list) => (
            <ListCard
              key={list.listId}
              listName={list.title}
              listId={list.listId}
              onDeleteList={handleDeleteList}
              boardId={boardId}
              listsLength={listsLength}
              listPosition={list.position}
              onShiftListLeft={handleShiftListLeft}
              onShiftListRight={handleShiftListRight}
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
