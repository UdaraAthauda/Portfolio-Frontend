import { Flex, Heading, HStack, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { ColorModeButton } from "../color-mode";
import Sidebar from "./Sidebar";
import logo from '/logo.png'


export default function Navbar() {
  const routes = [
    { to: "/", label: "Home" },
    { to: "/education", label: "Education" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <Flex
        as="nav"
        p={5}
        bg="blue.600"
        color="white"
        align="center"
        justify={{ base: "center", md: "space-between" }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        h="70px"
      >
        {/* Hamburger menu for mobile */}
        <Sidebar />

        {/* Logo */}
        <Heading as={NavLink} to="/" ml={{ base: 0, md: 10 }}>
          <Flex align={'center'}>
            <Image h={{base: '40px', md: '60px'}} src={logo} /> 
            <Text>Udara Athauda</Text>
          </Flex>
        </Heading>

        {/* Desktop links */}
        <HStack gap={4} mr={10} display={{ base: "none", md: "flex" }}>
          {routes.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "greenyellow" : "white",
                fontSize: isActive ? "18px" : "16px",
              })}
            >
              {label}
            </NavLink>
          ))}
          <ColorModeButton />
        </HStack>

        {/* Mobile color mode button */}
        <ColorModeButton
          position="absolute"
          display={{ base: "flex", md: "none" }}
          right="1rem"
        />
      </Flex>

      {/* Spacer to prevent overlap */}
      <Box h="64px" />
    </>
  );
}
