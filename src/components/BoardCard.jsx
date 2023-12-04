/** @format */
import {
  Card,
  Image,
  CardBody,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useState } from "react";
import { deleteRowFromTable } from "../googleSingIn/firebaseService";

// eslint-disable-next-line react/prop-types
function BoardCard({ title, bgImg, boardId, onGetBoards }) {
  const [isLoading, setIsLoading] = useState(false);

  // Delete a board
  const handleDeleteBoard = async (boardId) => {
    try {
      setIsLoading(true);
      await deleteRowFromTable("board", boardId);
      await onGetBoards();
    } catch (error) {
      console.error("Error deleting board:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card maxW="xs" position="relative" height="150px" cursor="pointer">
        {isLoading && <Loader />}
        <CloseButton
          position="absolute"
          top="1"
          right="1"
          color="black"
          width="20px"
          height="20px"
          bgColor="#aaa"
          zIndex="10"
          onClick={() => {
            handleDeleteBoard(boardId);
          }}
        />
        <Link to={`/board/${boardId}`}>
          <Image
            src={bgImg}
            alt="Background_Img"
            borderRadius="lg"
            h="150px"
            width="250px"
            objectFit="cover"
          />

          <CardBody
            position="absolute"
            top="0"
            p="4"
            w="100%"
            bg="rgba(0, 0, 0, 0.6)"
          >
            <Stack spacing="3" align="center" color="white">
              <Heading size="md">{title}</Heading>
            </Stack>
          </CardBody>
          <Divider />
        </Link>
      </Card>
    </div>
  );
}

export default BoardCard;
