/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import { Flex, ListItem, Icon } from "@chakra-ui/react";
import {
  CloseIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons";

function Card({
  listId,
  cardId,
  boardId,
  title,
  cardPosition,
  cardslength,
  listsLength,
  listPosition,
  onDeleteCard,
  onMoveUpCard,
  onMoveDownCard,
  onMoveCardRight,
  onMoveCardLeft,
}) {
  const handleRedirectToEditCard = () => {
    window.location = `/editCard/${boardId}/${listId}/${cardId}`;
  };
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
      <ListItem
        onClick={handleRedirectToEditCard}
        wordBreak={"break-word"}
        width={"80%"}
      >
        {title}
      </ListItem>
      <Flex>
        {cardPosition !== 1 && (
          <ListItem>
            <Icon
              fontSize={"18px"}
              as={ArrowUpIcon}
              color="blue.500"
              cursor="pointer"
              onClick={() => onMoveUpCard(cardPosition)}
            />
          </ListItem>
        )}

        {listsLength !== listPosition && (
          <ListItem>
            <Icon
              as={ArrowForwardIcon}
              fontSize={"18px"}
              color="blue.500"
              cursor="pointer"
              onClick={() =>
                onMoveCardRight(listPosition, cardPosition, cardId)
              }
            />
          </ListItem>
        )}
        {cardslength !== cardPosition && (
          <ListItem>
            <Icon
              as={ArrowDownIcon}
              fontSize={"18px"}
              color="blue.500"
              cursor="pointer"
              onClick={() => onMoveDownCard(cardPosition)}
            />
          </ListItem>
        )}
        {listPosition !== 1 && (
          <ListItem>
            <Icon
              as={ArrowBackIcon}
              fontSize={"18px"}
              color="blue.500"
              cursor="pointer"
              onClick={() => onMoveCardLeft(listPosition, cardPosition, cardId)}
            />
          </ListItem>
        )}
        <ListItem>
          <Icon
            as={CloseIcon}
            ml={1}
            fontSize={"12px"}
            color="blue.500"
            cursor="pointer"
            onClick={() => onDeleteCard(cardId, cardPosition)}
          />
        </ListItem>
      </Flex>
    </Flex>
  );
}

export default Card;
