/** @format */
import { List, Flex, Checkbox, Input, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  updateData,
  deleteRowFromTable,
} from "../googleSingIn/firebaseService";
import LoaderSmall from "./LoaderSamll";

// eslint-disable-next-line react/prop-types
function TodoItem({ isCompleted, title, todoId, getTodos }) {
  const [todoTitle, setTodoTitle] = useState(title || "");
  const [isChecked, setIsChecked] = useState(isCompleted || false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [updateText, setUpdateText] = useState("Save");

  // Handler for checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Handler for updating todo data
  const handleUpdateTodo = async () => {
    try {
      if (!todoTitle) {
        alert("Todo title is a required field");
        return;
      }
      setIsLoadingUpdate(true);
      const updatedData = {
        title: todoTitle,
        isCompleted: isChecked,
      };

      await updateData("todo", todoId, updatedData);
      setUpdateText("Saved");
    } catch (error) {
      console.error("Error updating todo data:", error.message);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  // Handler for deleting a todo
  const handleDeleteTodo = async () => {
    try {
      setIsLoadingDelete(true);
      await deleteRowFromTable("todo", todoId);
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    } finally {
      setIsLoadingDelete(false);
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
        {/* Checkbox for marking todo as completed */}
        <Checkbox
          size={"lg"}
          border={"1px solid #777"}
          isChecked={isChecked}
          onChange={() => {
            handleCheckboxChange();
            setUpdateText("Save");
          }}
        ></Checkbox>
        {/* Input field for todo title */}
        <Input
          p={1}
          width={"80%"}
          border={"1px solid #888"}
          placeholder="Enter Todo Here"
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
            setUpdateText("Save");
          }}
          style={{
            textDecoration: isChecked ? "line-through" : "none",
          }}
        />
        {/* Buttons for saving and deleting todo */}
        <Flex gap={"6px"}>
          <Button
            colorScheme="whatsapp"
            size={"xs"}
            onClick={handleUpdateTodo}
            position={"relative"}
            overflow={"hidden"}
          >
            {updateText}
            {isLoadingUpdate && <LoaderSmall />}
          </Button>
          <Button
            colorScheme="red"
            size={"xs"}
            onClick={handleDeleteTodo}
            position={"relative"}
            overflow={"hidden"}
          >
            {isLoadingDelete && <LoaderSmall />}
            {<DeleteIcon />}
          </Button>
        </Flex>
      </Flex>
    </List>
  );
}

export default TodoItem;
