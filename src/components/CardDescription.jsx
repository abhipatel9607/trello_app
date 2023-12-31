/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";
import { updateData } from "../googleSingIn/firebaseService";
import { useState } from "react";
import LoaderSmall from "./LoaderSamll";

function CardDescription({
  cardId,
  cardTitle,
  setCardTitle,
  cardDescription,
  setCardDescription,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [updateText, setUpdateText] = useState("Save");

  const handleUpdateCardData = async () => {
    try {
      if (!cardTitle || !cardDescription) {
        alert("Card title and description are required.");
        return;
      }

      setIsLoading(true);

      const updatedData = {
        title: cardTitle,
        description: cardDescription,
      };

      await updateData("card", cardId, updatedData);
      setUpdateText("Saved");
    } catch (error) {
      console.error("Error updating card data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container px={0} py={8} maxW="8xl">
      <Flex direction="column" gap={"10px"}>
        <FormControl>
          <Flex align={"center"}>
            <FormLabel m={0} width={"100px"}>
              Card Name:
            </FormLabel>
            <Input
              p={1}
              width={"400px"}
              border={"1px solid #888"}
              placeholder="Enter card name"
              value={cardTitle}
              onChange={(e) => {
                setCardTitle(e.target.value);
                setUpdateText("Save");
              }}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex align={"start"}>
            <FormLabel m={0} mt={0.5} width={"100px"}>
              Description:
            </FormLabel>

            <Textarea
              p={1}
              width={"400px"}
              height={"auto"}
              placeholder="Enter description"
              overflowY="auto"
              resize="none"
              cursor="top-left"
              border={"1px solid #888"}
              value={cardDescription}
              onChange={(e) => {
                setCardDescription(e.target.value);
                setUpdateText("Save");
              }}
            />
          </Flex>
        </FormControl>

        <Button
          ml={"100px"}
          width={"fit-content"}
          size={"xs"}
          colorScheme="blue"
          onClick={handleUpdateCardData}
          position={"relative"}
          overflow={"hidden"}
        >
          {updateText}
          {isLoading && <LoaderSmall />}
        </Button>
      </Flex>
    </Container>
  );
}

export default CardDescription;
