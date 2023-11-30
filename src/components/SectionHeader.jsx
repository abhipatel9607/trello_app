/** @format */
import { Text } from "@chakra-ui/react";

function SectionHeader({ text }) {
  return (
    <Text color="white" fontSize="3xl" borderBottom="2px solid #999" py={2}>
      {text}
    </Text>
  );
}

export default SectionHeader;
