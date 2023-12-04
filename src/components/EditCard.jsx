/** @format */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Center,
  Box,
  Stack,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import GoBackBtn from "./GoBackBtn";
import CardDescription from "./CardDescription";
import CreateNewTodo from "./CreateNewTodo";
import TodoItem from "./TodoItem";
import CreateNewComment from "./CreateNewComment";
import CommentItem from "./CommentItem";
import {
  createData,
  findById,
  getAllById,
} from "../googleSingIn/firebaseService";
import { UserAuth } from "../googleSingIn/AuthContext";

function EditCard() {
  const { user } = UserAuth();
  const { boardId, cardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [cardData, setCardData] = useState(null);
  const [todoData, setTodoData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoadingNewTodo, setIsLoadingNewTodo] = useState(false);
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);

  console.log(todoData);

  // Function
  const handleCreateNewTodo = async () => {
    try {
      if (!newTodo) {
        alert("Todo title is required.");
        return;
      }

      setIsLoadingNewTodo(true);

      const data = {
        cardId: cardId,
        title: newTodo,
        isCompleted: false,
      };

      await createData(data, "todo");
      setNewTodo("");
      getTodos();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoadingNewTodo(false);
    }
  };

  const getBoards = async () => {
    try {
      const data = await findById("board", boardId);
      setBoardData(data);
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  const getCards = async () => {
    try {
      const data = await findById("card", cardId);
      setCardData(data);
      setCardTitle(data.title);
      setCardDescription(data.description);
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };

  const getTodos = async () => {
    try {
      const data = await getAllById("todo", "cardId", cardId, "createdAt");
      setTodoData(data);
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  const getComments = async () => {
    try {
      const data = await getAllById("comment", "cardId", cardId, "createdAt");
      setCommentData(data);
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  const handleCreateNewComment = async () => {
    try {
      if (!newComment) {
        alert("Write a comment field is required for this action.");
        return;
      }

      setIsLoadingNewComment(true);

      const data = {
        cardId: cardId,
        userId: user.uid,
        commentText: newComment,
      };

      await createData(data, "comment");
      setNewComment("");
      getComments();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoadingNewComment(false);
    }
  };

  useEffect(() => {
    getBoards();
    getCards();
    getTodos();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  return (
    <Container
      maxW="8xl"
      bgImage={`url(${boardData ? boardData.bgImg : ""})`}
      py={8}
      minH="100vh"
    >
      <Container
        center={5}
        paddingTop={"16px"}
        paddingBottom={"48px"}
        width={"51%"}
        maxW="8xl"
        bg={"#dfdfdf"}
        borderRadius={"12px"}
        minH="100vh"
        position={"relative"}
      >
        <Link to={`/board/${boardId}`}>
          <GoBackBtn />
        </Link>
        <CardDescription
          cardId={cardId}
          cardTitle={cardTitle}
          setCardTitle={setCardTitle}
          cardDescription={cardDescription}
          setCardDescription={setCardDescription}
        />

        {/* TODO SECTION  */}
        <Center width={"600px"}>
          <Box
            maxW={"600px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            rounded={"md"}
            overflow={"hidden"}
            bgColor={"#dfdfdf"}
            position={"relative"}
          >
            <Stack pb={2} px={2} color={useColorModeValue("gray.800", "white")}>
              <Text fontSize={"20px"} color={"#333"} fontWeight={"bolder"}>
                Checklist
              </Text>
            </Stack>
            <Box
              bg={useColorModeValue("gray.50", "gray.900")}
              bgColor={"#dfdfdf"}
              px={2}
              pb={4}
            >
              {/* RENDER TODOS */}
              {todoData &&
                todoData.map((todo) => (
                  <TodoItem
                    key={todo.todoId}
                    isCompleted={todo.isCompleted}
                    title={todo.title}
                    todoId={todo.todoId}
                    getTodos={getTodos}
                  />
                ))}

              {/* CREATE NEW TODO */}
              <CreateNewTodo
                isLoadingNewTodo={isLoadingNewTodo}
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                onCreateNewTodo={handleCreateNewTodo}
              />
            </Box>
          </Box>
        </Center>

        {/* Comment Section */}
        <Center width={"600px"}>
          <Box
            maxW={"600px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            rounded={"md"}
            overflow={"hidden"}
            bgColor={"#dfdfdf"}
            position={"relative"}
          >
            <Stack pb={2} px={2} color={useColorModeValue("gray.800", "white")}>
              <Text color={"#333"} fontSize={"20px"} fontWeight={"bolder"}>
                Activity
              </Text>
            </Stack>
            <Box
              bg={useColorModeValue("gray.50", "gray.900")}
              bgColor={"#dfdfdf"}
              px={2}
              pb={4}
            >
              {/* Render Comment items/Card */}
              {commentData &&
                commentData.map((comment) => (
                  <CommentItem
                    key={comment.commentId}
                    user={user}
                    commentId={comment.commentId}
                    commentText={comment.commentText}
                    onGetComments={getComments}
                  />
                ))}

              {/* Add Comment */}
              <CreateNewComment
                isCreateNewCommentLoading={isLoadingNewComment}
                onCreateNewComment={handleCreateNewComment}
                newComment={newComment}
                setNewComment={setNewComment}
              />
            </Box>
          </Box>
        </Center>

        <Link to={`/board/${boardId}`}>
          <Button
            position="absolute"
            bottom="5"
            right="10"
            colorScheme="pink"
            size={"sm"}
          >
            Close
          </Button>
        </Link>
      </Container>
    </Container>
  );
}

export default EditCard;
