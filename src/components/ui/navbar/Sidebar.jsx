import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaGraduationCap, FaLaptopCode, FaPhoneAlt } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const routes = [
    { to: "/", label: "Home", icon: <MdHome /> },
    { to: "/education", label: "Education", icon: <FaGraduationCap /> },
    { to: "/skills", label: "Skills", icon: <HiLightBulb /> },
    { to: "/projects", label: "Projects", icon: <FaLaptopCode /> },
    { to: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <Drawer.Root
      size={"xs"}
      placement={"start"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <IconButton
          color={"white"}
          variant={"ghost"}
          display={{ base: "flex", md: "none" }}
          position="absolute"
          left="1rem"
          onClick={() => setOpen(true)}
        >
          <GiHamburgerMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header borderBottomWidth="1px">
              <Drawer.Title>Check about my details</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack gap={8} mt={"20%"}>
                {routes.map(({ to, label, icon }) => (
                  <Button
                    as={NavLink}
                    to={to}
                    key={to}
                    w={"full"}
                    pl={"33%"}
                    justifyContent={"flex-start"}
                    variant={"subtle"}
                    colorPalette={"blue"}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      backgroundColor: isActive ? "lightgreen" : "",
                      color: isActive ? "green" : "",
                    })}
                  >
                    {icon} {label}
                  </Button>
                ))}
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <Button w={"full"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Sidebar;
