import {
  Box,
  Container,
  Flex,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaPhoneSquareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.900"
      color="white"
      py={4}
      mt="auto" // Pushes footer to bottom when content is short
      w="100%"
      position="relative"
      bottom={0}
    >
      <Container maxW="6xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          {/* Left text */}
          <Text fontSize="sm" textAlign="center">
            © {new Date().getFullYear()} UD Websites. All rights reserved.
          </Text>

          {/* Social icons */}
          <HStack spacing={4}>
            <IconButton
              as="a"
              href="https://github.com/UdaraAthauda"
              aria-label="GitHub"
              variant="ghost"
              color="white"
              _hover={{ color: "teal.400" }}
            >
              <FaGithub />
            </IconButton>

            <IconButton
              as="a"
              href="http://www.linkedin.com/in/udara-athauda-12ab07285"
              aria-label="LinkedIn"
              variant="ghost"
              color="white"
              _hover={{ color: "teal.400" }}
            >
              <FaLinkedin />
            </IconButton>

            <IconButton
              as={Link}
              to="/contact"
              aria-label="Contact"
              variant="ghost"
              color="white"
              _hover={{ color: "teal.400" }}
            >
              <FaPhoneSquareAlt />
            </IconButton>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
