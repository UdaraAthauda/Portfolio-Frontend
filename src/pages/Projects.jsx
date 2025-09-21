import React, { useEffect, useState } from "react";
import {
  Container,
  SimpleGrid,
  Card,
  Image,
  Tag,
  Button,
  HStack,
  Heading,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import api from "../../api";
import { FaGithub, FaArrowRight, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Projects() {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.get("projects/");
      setProjectData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (projectData.length === 0) {
    return <LoadingSpinner />;
  }

  const formatDate = (date) => {
    if (!date) return "Present"; // handle null values
    const d = new Date(date);
    return d.toLocaleString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container maxW="7xl" py={7} centerContent>
            <Heading
              textAlign="center"
              mb={5}
              size={{ base: "2xl", md: "3xl" }}
              color="purple.700"
            >
              <HStack justify={"center"}>
                <FaLaptopCode /> Latest Project Works.
              </HStack>
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              {projectData.map((project) => (
                <Card.Root
                  key={project.id}
                  w={{ base: "full", md: "xl" }}
                  maxW="lg"
                  overflow="hidden"
                  borderRadius={5}
                  shadow="md"
                  _hover={{
                    transform: "translateY(-6px)",
                    shadow: "xl",
                    transition: "0.3s",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    objectFit="cover"
                    maxH="250px"
                    w="100%"
                  />

                  <Card.Body gap="2">
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      w="100%"
                      align={{ base: "flex-start", md: "center" }}
                      spacing={{ base: 1, md: 4 }}
                    >
                      <Card.Title>{project.name}</Card.Title>
                      <Text
                        as="small"
                        fontWeight="medium"
                        color="gray.500"
                        ml={{ base: 0, md: "auto" }}
                      >
                        {formatDate(project.created_at)}
                      </Text>
                    </Stack>
                    <Card.Description textAlign={"justify"}>
                      {project.description}
                    </Card.Description>

                    <HStack mt={2} flexWrap="wrap" gap={2}>
                      {project.skills.map((skill, i) => (
                        <Tag.Root
                          key={skill.id}
                          colorPalette={"purple"}
                          size={"lg"}
                        >
                          <Tag.Label>{skill.name}</Tag.Label>
                        </Tag.Root>
                      ))}
                    </HStack>
                  </Card.Body>

                  <Card.Footer gap="2">
                    <Button
                      as="a"
                      href={project.github}
                      w={"full"}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="solid"
                    >
                      <FaGithub /> View Code
                    </Button>
                  </Card.Footer>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Container>

          <Container maxW="6xl" mb={5}>
            <Flex justify={{ base: "center", md: "end" }}>
              <Button
                as={Link}
                to="/contact"
                variant={"subtle"}
                colorPalette={"teal"}
              >
                Contact
                <FaArrowRight />
              </Button>
            </Flex>
          </Container>
        </>
      )}
    </>
  );
}
