/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import { useState } from "react";
import { deleteRowFromTable } from "../googleSingIn/firebaseService";
import { List, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
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
        <Icon
          as={DeleteIcon}
          fontSize={"16px"}
          color="blue.500"
          cursor="pointer"
          position="absolute"
          top="2"
          right="2"
          onClick={() => handleDeleteComment(commentId)}
        />
      </Flex>
    </List>
  );
}

export default CommentItem;
