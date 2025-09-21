import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Wrap,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaUserTie,
  FaArrowRight,
  FaBriefcase,
} from "react-icons/fa";
import api from "../../api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Education() {
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return "Present"; // handle null values
    const d = new Date(date);
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.get("education/");
      setEducationData(res.data);

      const res2 = await api.get("experiences/");
      setExperienceData(res2.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (educationData.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Education */}
          <Container maxW="6xl" py={7}>
            <Heading
              textAlign="center"
              mb={5}
              size={{ base: "2xl", md: "3xl" }}
              color="purple.700"
            >
              <HStack justify={"center"}>
                <FaGraduationCap /> Education
              </HStack>
            </Heading>

            <VStack gap={8} align="stretch">
              {educationData.map((edu, index) => (
                <Box
                  key={index}
                  p={6}
                  borderWidth="1px"
                  borderRadius="2xl"
                  shadow="md"
                  _hover={{ transform: "translateY(-4px)", transition: "0.3s" }}
                >
                  <HStack gap={4} mb={2}>
                    <Icon as={FaGraduationCap} boxSize={6} color="teal.500" />
                    <Heading size="md">{edu.degree}</Heading>
                  </HStack>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} mb={3}>
                    <Text fontWeight="bold" color="blue.600">
                      {edu.institution}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color={{ base: "gray.600", _dark: "gray.400" }}
                      textAlign={{ base: "left", sm: "right" }}
                    >
                      {new Date(edu.start_date).getFullYear()} -{" "}
                      {new Date(edu.end_date).getFullYear()}
                    </Text>
                  </SimpleGrid>

                  <Text
                    color={{ base: "gray.700", _dark: "gray.300" }}
                    textAlign={"justify"}
                  >
                    {edu.description}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Container>

          {/* Experience */}
          <Container maxW="6xl" py={5}>
            <Heading
              textAlign="center"
              mb={10}
              size={{ base: "2xl", md: "3xl" }}
              color="green.700"
            >
              <HStack justify={"center"}>
                <FaBriefcase /> Work Experience
              </HStack>
            </Heading>

            <VStack gap={8} align="stretch">
              {experienceData.map((exp, index) => (
                <Box
                  key={index}
                  p={6}
                  borderWidth="1px"
                  borderRadius="2xl"
                  shadow="md"
                  _hover={{ transform: "translateY(-4px)", transition: "0.3s" }}
                >
                  <HStack gap={4} mb={2}>
                    <Icon as={FaUserTie} boxSize={6} color="teal.500" />
                    <Heading size="md">{exp.position}</Heading>
                  </HStack>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3} mb={3}>
                    <Text fontWeight="bold" color="blue.600">
                      {exp.company}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color={{ base: "gray.600", _dark: "gray.400" }}
                      textAlign={{ base: "left", sm: "right" }}
                    >
                      {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                    </Text>
                  </SimpleGrid>

                  <Text
                    color={{ base: "gray.700", _dark: "gray.300" }}
                    textAlign={"justify"}
                  >
                    {exp.description}
                  </Text>

                  <Wrap mt={5}>
                    {exp.skills.map((skill) => (
                      <Tag.Root
                        key={skill.id}
                        colorPalette={"purple"}
                        size={"lg"}
                      >
                        <Tag.Label>{skill.name}</Tag.Label>
                      </Tag.Root>
                    ))}
                  </Wrap>
                </Box>
              ))}
            </VStack>

            <Flex justify={{ base: "center", md: "end" }} mt={5}>
              <Button
                as={Link}
                to="/skills"
                variant={"subtle"}
                colorPalette={"teal"}
              >
                Skills <FaArrowRight />
              </Button>
            </Flex>
          </Container>
        </>
      )}
    </>
  );
}
