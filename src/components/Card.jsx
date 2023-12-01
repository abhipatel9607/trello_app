/** @format */
import { Flex, ListItem, Icon } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card({ boardId, listId, cardId, title, onDeleteCard }) {
  console.log("list:", listId, "card:", cardId);
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
          <Link to={`/editCard/${boardId}/${listId}/${cardId}`}>
            <Icon as={EditIcon} ml={2} color="blue.500" cursor="pointer" />
          </Link>
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
