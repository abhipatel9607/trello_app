/** @format */
import {
  Card,
  Image,
  CardBody,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function BoardCard({ title, bgImg, boardId, onDeleteBoard }) {
  return (
    <div>
      <Card maxW="xs" position="relative" height="150px" cursor="pointer">
        <CloseButton
          position="absolute"
          top="1"
          right="1"
          color="black"
          width="20px"
          height="20px"
          bgColor="#aaa"
          zIndex="10"
          onClick={() => {
            onDeleteBoard(boardId);
          }}
        />
        <Link to={`/board/${boardId}`}>
          <Image
            src={bgImg}
            alt="Background_Img"
            borderRadius="lg"
            h="150px"
            width="250px"
            objectFit="cover"
          />

          <CardBody
            position="absolute"
            top="0"
            p="4"
            w="100%"
            bg="rgba(0, 0, 0, 0.6)"
          >
            <Stack spacing="3" align="center" color="white">
              <Heading size="md">{title}</Heading>
            </Stack>
          </CardBody>
          <Divider />
        </Link>
      </Card>
    </div>
  );
}

export default BoardCard;
