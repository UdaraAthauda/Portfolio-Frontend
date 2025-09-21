import { AbsoluteCenter, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function LoadingSpinner() {
  return (
    <AbsoluteCenter>
      <Flex w="100%" justify="center" align="center" p={{ base: 4, md: 8 }}>
        <VStack>
          <Spinner size={"xl"} color="purple.700" />
          <Text fontSize={"xl"} color={"purple.700"}>
            Loading.....
          </Text>
        </VStack>
      </Flex>
    </AbsoluteCenter>
  );
}
