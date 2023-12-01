/** @format */
import { Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function SectionHeader({ text }) {
  return (
    <Text
      bgColor="rgba(204, 204, 204, 0.5)"
      color="Black"
      fontWeight={700}
      fontSize="3xl"
      borderBottom="2px solid #999"
      p={2}
    >
      {text}
    </Text>
  );
}

export default SectionHeader;
