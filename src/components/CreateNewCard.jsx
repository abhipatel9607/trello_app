/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Loader from "./Loader";

function CreateNewCard({
  isCreateNewCardLoading,
  newCardTitle,
  setNewCardTitle,
  onCreateCard,
}) {
  return (
    <Flex
      cursor={"pointer"}
      bgColor={"#eee"}
      rounded={"md"}
      gap={"4px"}
      px={1}
      py={1}
      justifyContent="space-between"
      alignItems={"center"}
      position={"relative"}
      overflow={"hidden"}
    >
      {isCreateNewCardLoading && <Loader />}
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
