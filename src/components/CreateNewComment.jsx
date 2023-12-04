/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */
import { List, Flex, Input, Button } from "@chakra-ui/react";
import LoaderSmall from "./LoaderSamll";

function CreateNewComment({
  newComment,
  setNewComment,
  onCreateNewComment,
  isCreateNewCommentLoading,
}) {
  return (
    <List mb={"10px"} spacing={2}>
      <Flex
        bgColor={"#fff"}
        rounded={"md"}
        boxShadow="md"
        px={2}
        py={2}
        direction={"column"}
        align={"start"}
        gap={2}
      >
        <Input
          p={1}
          width={"100%"}
          border={"1px solid #888"}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          colorScheme="telegram"
          size={"xs"}
          onClick={onCreateNewComment}
          position={"relative"}
          overflow={"hidden"}
        >
          {isCreateNewCommentLoading && <LoaderSmall />}
          Add Comment
        </Button>
      </Flex>
    </List>
  );
}

export default CreateNewComment;
