import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Container,
  SimpleGrid,
  Image,
  Heading,
  Flex,
  Box,
  Tabs,
  Button,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Skills() {
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    api
      .get("skills/")
      .then((res) => setSkillData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Group skills by area
  const grouped = (skillData ?? []).reduce((acc, skill) => {
    const { area, ...rest } = skill;
    if (!acc[area]) acc[area] = [];
    acc[area].push(rest);
    return acc;
  }, {});

  const areas = Object.keys(grouped);

  if (areas.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Container maxW="6xl" py={{ base: 6, md: 10 }}>
        <Tabs.Root
          defaultValue={areas[0]}
          variant="outline"
          lazyMount
          unmountOnExit
        >
          <Tabs.List
            justify="center"
            flexWrap="nowrap"
            overflowX="auto"
            gap={1}
          >
            {areas.map((area) => (
              <Tabs.Trigger
                key={area}
                value={area}
                _selected={{
                  bg: "purple.700",
                  color: "white",
                }}
                fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                px={{ base: 2, md: 5 }}
                py={{ base: 1, md: 2 }}
                borderRadius="md"
                minW="auto"
                whiteSpace="nowrap"
              >
                {area.toUpperCase()}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {areas.map((area) => (
            <Tabs.Content key={area} value={area} mt={{ base: 4, md: 6 }}>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 4, md: 6 }}>
                {grouped[area].map((skill, idx) => (
                  <Box
                    key={skill.id ?? idx}
                    textAlign="center"
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg"
                    _hover={{ shadow: "md", transform: "scale(1.03)" }}
                    transition="0.2s"
                  >
                    {skill.icon_url && (
                      <Image
                        src={skill.icon_url}
                        alt={skill.name}
                        boxSize={{ base: "40px", md: "60px" }}
                        mx="auto"
                        mb={2}
                      />
                    )}
                    <Heading size={{ base: "xs", md: "md" }}>
                      {skill.name}
                    </Heading>
                  </Box>
                ))}
              </SimpleGrid>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>

      <Container maxW="6xl" mb={5}>
        <Flex justify={{ base: "center", md: "end" }} mt={5}>
          <Button
            as={Link}
            to="/projects"
            variant={"subtle"}
            colorPalette={"teal"}
          >
            Projects
            <FaArrowRight />
          </Button>
        </Flex>
      </Container>
    </>
  );
}
