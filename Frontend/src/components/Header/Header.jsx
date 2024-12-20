import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { DesktopNav, MobileNav } from "./Navigation.jsx";
import Logo from "./Logo.jsx"; // Import the Logo component
import LogoMobile from "./LogoMobile.jsx"

const Header = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000} // Ensure it's on top of all elements
      transition="transform 0.3s ease-in-out"
      transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={useBreakpointValue({ lg: "60px", "3xl": "80px" })}
        py={{ base: 2, lg: "0", "3xl": "8" }}
        px={{ base: 4 }}
        align={"center"}
        justify={useBreakpointValue({ base: "space-between", lg: "center" })}
        position="relative"
      >
        {/* Hamburger Icon on mobile */}
        <Flex
          flex={{ base: 1, lg: "none" }}
          ml={{ base: -2, lg: 0 }}
          display={{ base: "flex", lg: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            color={useColorModeValue("pink.600", "pink.300")}
          />
        </Flex>

        {/* Logo in the center on mobile and desktop */}
        <Flex
          flex={{ base: 1, lg: "none" }}
          justify={{ base: "center", lg: "center" }} // Center on both mobile and desktop
          position={{ base: "absolute", lg: "relative" }} // Position absolute to center the logo
          left={{ base: "60%", lg: "0" }}
          transform={{ base: "translateX(-50%)", lg: "none" }} // Center the logo with transform
        >
           {/* Render Logomobile for mobile view and Logo for desktop */}
          {useBreakpointValue({ base: <LogoMobile />, lg: <Logo /> })}
        </Flex>

        {/* Navbar in the center on desktop view */}
        <Flex
          flex={{ base: 0, lg: 1 }}
          justify={"center"} // Center the navbar on desktop
          align="center"
          display={{ base: "none", lg: "flex" }}
        >
          <DesktopNav />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onClose={onClose} /> {/* Pass onClose here */}
      </Collapse>
    </Box>
  );
};

export default Header;
