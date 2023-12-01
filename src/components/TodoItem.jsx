/** @format */
import { List, Flex, Checkbox, Input, Button } from "@chakra-ui/react";

import { useState } from "react";
import {
  updateData,
  deleteRowFromTable,
} from "../googleSingIn/firebaseService";
import { LoadContext } from "../helper/loderConfig";

// eslint-disable-next-line react/prop-types
function TodoItem({ isCompleted, title, todoId, getTodos }) {
  const [todoTitle, setTodoTitle] = useState(title || "");
  const [isChecked, setIsChecked] = useState(isCompleted || false);
  const { setIsLoading } = LoadContext();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUpdateTodo = async () => {
    try {
      if (!todoTitle) {
        alert("Todo title is a required field");
        return;
      }
      setIsLoading(true);
      const updatedData = {
        title: todoTitle,
        isCompleted: isChecked,
      };

      await updateData("todo", todoId, updatedData);
      console.log("Updated");
    } catch (error) {
      console.error("Error updating todo data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      setIsLoading(true);
      await deleteRowFromTable("todo", todoId);
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <List mb={"10px"} spacing={2}>
      <Flex
        bgColor={"#fff"}
        rounded={"md"}
        px={2}
        py={2}
        justifyContent="space-between"
        align={"center"}
      >
        <Checkbox
          size={"lg"}
          border={"1px solid #777"}
          isChecked={isChecked}
          onChange={handleCheckboxChange}
        ></Checkbox>
        <Input
          p={1}
          width={"430px"}
          border={"1px solid #888"}
          placeholder="Enter Todo Here"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          style={{
            textDecoration: isChecked ? "line-through" : "none",
          }}
        />
        <Flex gap={"6px"}>
          <Button colorScheme="whatsapp" size={"xs"} onClick={handleUpdateTodo}>
            Save
          </Button>
          <Button colorScheme="red" size={"xs"} onClick={handleDeleteTodo}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </List>
  );
}

export default TodoItem;
