/** @format */
import { Container, Box, Text } from "@chakra-ui/react";

import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  Flex,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

function Board() {
  return (
    <Container maxW="8xl" bg="blue.600" minH="100vh" centerContent>
      <Container p="8" bg="blue.600" color="black" maxW="7xl">
        <Text color="white" fontSize="3xl" borderBottom="2px solid #999" p={2}>
          Your Boards
        </Text>

        <Flex gap="4" wrap="wrap" marginTop="16px">
          <Card maxW="xs" position="relative" height="150px" cursor="pointer">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
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
              bg="rgba(0, 0, 0, 0.1)"
            >
              <Stack spacing="3" align="center" color="white">
                <Heading size="md">Living room Sofa</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>{" "}
          <Card maxW="xs" position="relative" height="150px" cursor="pointer">
            <Container borderRadius="lg" h="150px" width="250px"></Container>

            <CardBody
              position="absolute"
              top="0"
              p="4"
              w="100%"
              bg="rgba(0, 0, 0, 0.3)"
            >
              <Stack spacing="3" align="center" color="white">
                <Heading size="md">Create New Board</Heading>
              </Stack>
            </CardBody>
            <CardBody
              position="absolute"
              top="45%"
              p="4"
              w="100%"
              bg="rgba(0, 0, 0, 0)"
            >
              <Stack spacing="3" align="center" color="gray">
                <Heading size="md">Click me</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>
        </Flex>
      </Container>
    </Container>
  );
}

export default Board;
