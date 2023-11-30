/** @format */

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useParams } from "react-router-dom";
import ListCard from "./ListCard";
import CreateNewList from "./CreateNewList";
import {
  deleteRowFromTable,
  findById,
  getAllById,
} from "../googleSingIn/firebaseService";
import { Container, Flex, list } from "@chakra-ui/react";
import { createData } from "../googleSingIn/firebaseService";

function ListPage() {
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [boardData, setBoardData] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");

  const handleCreateList = async () => {
    if (!newListTitle) {
      alert("List title required.");
      return;
    }
    const listData = {
      title: newListTitle,
      boardId: boardId,
      position: "",
    };
    await createData(listData, "list");

    getList();
    setNewListTitle("");
  };

  const handleDeleteList = async (listId) => {
    await deleteRowFromTable("list", listId);
    getList();
  };

  const getList = async () => {
    const listsArray = await getAllById("list", "boardId", boardId);
    setLists(listsArray);
  };

  useEffect(() => {
    getList();
  }, [setLists]);

  useEffect(() => {
    const getBoardDetail = async () => {
      try {
        const data = await findById("board", boardId);
        setBoardData(data);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    getBoardDetail();
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
      <Container p="8" color="black" width={"100vw"} maxW="7xl">
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
