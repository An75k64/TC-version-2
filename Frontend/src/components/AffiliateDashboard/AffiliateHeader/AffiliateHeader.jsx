import React from "react";
import {
  Box,
  Flex,
  Stack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  Collapse,
  Text,
  Link as ChakraLink
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Logo from "../../Header/Logo"; // Ensure you have a Logo component

const AffiliateHeader = () => {
  const { isOpen, onToggle } = useDisclosure();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("blue.400", "blue.300");

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} align="center">
          <Logo />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          

          <IconButton
            size="lg"
            variant="ghost"
            aria-label="Notifications"
            icon={<BellIcon />}
          />

          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://bit.ly/broken-link"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("blue.400", "blue.300");

  const NAV_ITEMS = [
    { label: "Dashboard", href: "/affiliate-dashboard" },
    { label: "Referrals", href: "/affiliate-dashboard/referrals" },
    { label: "Earnings", href: "/affiliate-dashboard/earnings" },
    { label: "Post a Job", href: "/affiliate-dashboard/postjob" },
    { label: "Support", href: "/affiliate-dashboard/support" },
  ];

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <ChakraLink
            as={Link}
            to={navItem.href}
            padding="8px"
            fontSize="sm"
            fontWeight={500}
            color={linkColor}
            textDecoration="none"
            borderBottom="2px solid transparent"
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
              borderBottomColor: linkHoverColor,
            }}
          >
            {navItem.label}
          </ChakraLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  const NAV_ITEMS = [
     { label: "Dashboard", href: "/affiliate-dashboard" },
    { label: "Referrals", href: "/affiliate-dashboard/referrals" },
    { label: "Earnings", href: "/affiliate-dashboard/earnings" },
    { label: "Post a Job", href: "/affiliate-dashboard/postjob" },
    { label: "Support", href: "/affiliate-dashboard/support" },
  ];

  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <Flex
          key={navItem.label}
          py={2}
          as={Link}
          to={navItem.href}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: "none",
            position: "relative",
            _after: {
              content: `""`,
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: "2px",
              backgroundColor: useColorModeValue("blue.600", "blue.300"),
              transition: "width 0.2s ease-in-out",
            },
          }}
        >
          <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
            {navItem.label}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
};

export default AffiliateHeader;
