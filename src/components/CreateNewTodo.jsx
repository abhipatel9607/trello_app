/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */
import { List, Flex, Input, Button } from "@chakra-ui/react";
import LoaderSmall from "./LoaderSamll";

function CreateNewTodo({
  isLoadingNewTodo,
  newTodo,
  setNewTodo,
  onCreateNewTodo,
}) {
  return (
    <List mb={"10px"} spacing={2}>
      <Flex
        bgColor={"#fff"}
        rounded={"md"}
        px={2}
        py={2}
        direction={"column"}
        align={"start"}
        gap={2}
        position={"relative"}
        overflow={"hidden"}
      >
        <Input
          p={1}
          width={"100%"}
          border={"1px solid #888"}
          placeholder="Enter Todo Here"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          colorScheme="telegram"
          size={"xs"}
          onClick={onCreateNewTodo}
          position={"relative"}
          overflow={"hidden"}
        >
          Create New Todo
          {isLoadingNewTodo && <LoaderSmall />}
        </Button>
      </Flex>
    </List>
  );
}

export default CreateNewTodo;
