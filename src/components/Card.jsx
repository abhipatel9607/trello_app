/** @format */
import { Flex, ListItem, Icon } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

function Card({ cardId, title, onDeleteCard, onOpen }) {
  return (
    <Flex
      cursor={"pointer"}
      bgColor={"#eee"}
      rounded={"md"}
      boxShadow="2xl"
      px={2}
      py={2}
      justifyContent="space-between"
    >
      <ListItem>{title}</ListItem>
      <Flex>
        <ListItem>
          <Icon
            onClick={onOpen}
            as={EditIcon}
            ml={2}
            color="blue.500"
            cursor="pointer"
          />
        </ListItem>
        <ListItem>
          <Icon
            as={CloseIcon}
            ml={2}
            width={"12px"}
            color="blue.500"
            cursor="pointer"
            onClick={() => onDeleteCard(cardId)}
          />
        </ListItem>
      </Flex>
    </Flex>
  );
}

export default Card;
