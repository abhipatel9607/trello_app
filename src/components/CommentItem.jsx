/** @format */

import { List, Flex, Image, Text, CloseButton } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function CommentItem({ user, commentId, commentText, onDeleteComment }) {
  return (
    <List mb={"10px"} spacing={2} position={"relative"}>
      <Flex
        bgColor={"#fff"}
        rounded={"md"}
        px={2}
        py={2}
        gap={"6px"}
        align={"start"}
      >
        <Image src={user?.photoURL} alt="logo" width="6%" borderRadius="8px" />
        <Flex flexDirection={"column"}>
          <Text fontSize="md" fontWeight={"600"}>
            {user?.displayName}
          </Text>
          <Text fontSize="sm">{commentText}</Text>
        </Flex>
      </Flex>
      <CloseButton
        position="absolute"
        top="0"
        right="1"
        color="black"
        width="15px"
        height="10px"
        zIndex="10"
        onClick={() => onDeleteComment(commentId)}
      />
    </List>
  );
}

export default CommentItem;
