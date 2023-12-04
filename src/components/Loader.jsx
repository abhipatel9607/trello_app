/** @format */
import { Spinner, Center } from "@chakra-ui/react";

function Loader() {
  return (
    <div>
      {
        <Center
          zIndex={"1000"}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          background="rgba(0, 0, 0, 0.5)"
        >
          <Spinner size="md" color="white" />
        </Center>
      }
    </div>
  );
}

export default Loader;
