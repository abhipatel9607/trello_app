/* eslint-disable react/prop-types */
/** @format */

import { List, Flex, Image, Text, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { deleteRowFromTable } from "../googleSingIn/firebaseService";
import Loader from "./Loader";

function CommentItem({ user, commentId, commentText, onGetComments }) {
  const [isLoadingDeleteComment, setIsLoadingDeleteComment] = useState(false);

  const handleDeleteComment = async (commentId) => {
    try {
      setIsLoadingDeleteComment(true);
      await deleteRowFromTable("comment", commentId);
      await onGetComments();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoadingDeleteComment(false);
    }
  };

  return (
    <List mb={"10px"} spacing={2}>
      <Flex
        bgColor={"#fff"}
        rounded={"md"}
        px={2}
        py={2}
        gap={"6px"}
        align={"start"}
        position={"relative"}
        overflow={"hidden"}
      >
        {isLoadingDeleteComment && <Loader />}
        <Image src={user?.photoURL} alt="logo" width="6%" borderRadius="8px" />
        <Flex flexDirection={"column"}>
          <Text fontSize="md" fontWeight={"600"}>
            {user?.displayName}
          </Text>
          <Text fontSize="sm">{commentText}</Text>
        </Flex>
        <CloseButton
          position="absolute"
          top="2"
          right="1"
          color="black"
          width="15px"
          height="10px"
          zIndex="10"
          onClick={() => handleDeleteComment(commentId)}
        />
      </Flex>
    </List>
  );
}

export default CommentItem;
