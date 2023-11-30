/** @format */
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function CreateNewCard({ newCardTitle, setNewCardTitle, onCreateCard }) {
  return (
    <Flex
      cursor={"pointer"}
      bgColor={"#eee"}
      rounded={"md"}
      boxShadow="2xl"
      gap={"4px"}
      px={1}
      py={1}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Input
        isInvalid
        errorBorderColor="blue.300"
        placeholder="Create New Card"
        px={1}
        value={newCardTitle}
        onChange={(e) => setNewCardTitle(e.target.value)}
      />
      <IconButton
        icon={<AddIcon />}
        aria-label="Save"
        colorScheme="blue"
        size="xs"
        onClick={onCreateCard}
      />
    </Flex>
  );
}

export default CreateNewCard;
