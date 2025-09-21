import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaArrowRight,
  FaPhoneSquareAlt,
  FaRegCompass,
} from "react-icons/fa";
import api from "../../api";
import { Link } from "react-router-dom";
import ResumeDownload from "@/components/ui/ResumeDownload";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toaster } from "@/components/ui/toaster";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.get("introduction/");
      setData(res.data[0]);
    } catch (error) {
      console.log(error);

      toaster.create({
        title: "Server Error?",
        description: "Check your connection and please try again!",
        type: "error",
        duration: Infinity,
        closable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container mt={8} mb={5} centerContent>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            {/* Profile + Socials */}
            <Flex
              justify="center"
              align="center"
              flexDir={{ base: "column", md: "row" }}
            >
              <VStack gap={2}>
                <HStack gap={5} align="center">
                  <Image
                    alt="UD img"
                    src={data?.profile_img}
                    h={{ base: "250px", sm: "300px", md: "400px" }}
                    bg="blue.100"
                    p="20px"
                    border="3px solid"
                    borderColor="blue.400"
                    borderRadius="full"
                    _hover={{
                      transform: "scale(1.05)",
                      transition: "0.3s ease-in-out",
                    }}
                  />

                  {/* Social Icons */}
                  <Flex flexDir="column" gap={5}>
                    <IconButton
                      as={"a"}
                      href={data?.github}
                      aria-label="GitHub"
                      variant="solid"
                      colorPalette="teal"
                    >
                      <FaGithub />
                    </IconButton>
                    <IconButton
                      as={"a"}
                      href={data?.linkedin}
                      aria-label="LinkedIn"
                      variant="solid"
                      colorPalette="teal"
                    >
                      <FaLinkedin />
                    </IconButton>
                    <IconButton
                      as={Link}
                      to="/contact"
                      aria-label="Email"
                      variant="solid"
                      colorPalette="teal"
                    >
                      <FaPhoneSquareAlt />
                    </IconButton>
                  </Flex>
                </HStack>

                <Heading
                  size={{ base: "3xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                  textAlign="center"
                >
                  Hi, I'm{" "}
                  <Text as="span" color="purple.700">
                    Udara
                  </Text>{" "}
                  Athauda
                  <Text as="span" color="purple.700">
                    .
                  </Text>
                </Heading>
              </VStack>
            </Flex>

            {/* About Me */}
            <VStack gap={5} mr={{ base: 0, md: 10 }}>
              <Heading
                size={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                textAlign="center"
              >
                <HStack>
                  <FaRegCompass /> About Me.
                </HStack>
              </Heading>

              <Text textAlign={"center"} fontWeight={"bold"}>
                {data?.description}
              </Text>

              <Text
                fontSize={{ base: "md", md: "lg" }}
                textAlign="justify"
                color={{ base: "gray.700", _dark: "gray.300" }}
              >
                {data?.about}
              </Text>

              <Flex justify={"space-between"} gap={2} w={"100%"}>
                <ResumeDownload resumeUrl={data?.resume} />
                <Button
                  as={Link}
                  to="/education"
                  variant={"subtle"}
                  colorPalette={"teal"}
                >
                  Education
                  <FaArrowRight />
                </Button>
              </Flex>
            </VStack>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
}
