/** @format */
import {
  Center,
  Box,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function CreateNewList({ newListTitle, setNewListTitle, onCreateList }) {
  return (
    <Center flexShrink={0} alignItems={"start"} py={6} width={"260px"}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"md"}
        boxShadow={"dark-lg"}
        overflow={"hidden"}
      >
        <Box
          bg={useColorModeValue("gray.50", "gray.900")}
          bgColor={"#ccc"}
          px={2}
          py={2}
        >
          <Input
            isInvalid
            errorBorderColor="blue.300"
            placeholder="Enter list title"
            px={1}
            boxShadow="2xl"
            bgColor={"white"}
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <Button
            size="xs"
            mt={"8px"}
            colorScheme="blue"
            onClick={onCreateList}
          >
            Add list
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default CreateNewList;
