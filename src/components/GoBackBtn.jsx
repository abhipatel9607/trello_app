/** @format */
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function GoBackBtn() {
  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      color={"#555"}
      bgColor={""}
      width={"50px"}
      height={"35px"}
      fontSize={"22px"}
      border={"2px solid #555"}
      borderRadius={"12px"}
      variant="outline"
      _hover={{ bgColor: "gray.300" }}
    ></Button>
  );
}

export default GoBackBtn;
