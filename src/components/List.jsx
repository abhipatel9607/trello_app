/** @format */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import SectionHeader from "./SectionHeader";
import ListCard from "./ListCard";
import CreateNewList from "./CreateNewList";
import {
  createData,
  findById,
  getAllById,
} from "../googleSingIn/firebaseService";
import Loader from "./Loader";

function ListPage() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBoardData, setIsLoadingBoardData] = useState(false);

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

  const fetchData = async () => {
    try {
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
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  
  // Fetch board details
  useEffect(() => {
    const getBoardDetail = async () => {
      try {
        setIsLoadingBoardData(true);
        const data = await findById("board", boardId);
        setBoardData(data);
      } catch (error) {
        console.error("Error fetching board details:", error);
      } finally {
        setIsLoadingBoardData(false);
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
      position={"relative"}
    >
      {isLoadingBoardData && <Loader />}
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
              listData={listData}
              onFetchData={fetchData}
            />
          ))}

          <CreateNewList
            isLoading={isLoading}
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
