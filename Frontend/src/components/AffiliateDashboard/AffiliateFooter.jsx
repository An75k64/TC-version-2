import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs"; // Import LinkedIn icon
import { HashLink as Link } from "react-router-hash-link"; // Import HashLink
import logo from "../../assets/images/Logo/logo.png"; // Adjust the path if needed

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg="transparent"
      borderRadius="md"
      _hover={{
        bg: useColorModeValue("pink.300", "pink.700"),
      }}
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </chakra.button>
  );
};

export default function AffiliateFooter() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={10}
      mt={10}
    >
      <Container maxW="6xl">
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={10}
          textAlign="left"
        >
          <Stack spacing={4}>
            <a href="/">
              <img
                src={logo}
                alt="Talent Connect Logo"
                style={{ height: "60px", width: "70px" }}
              />
            </a>
            <Text fontSize="sm" color="black">
              © 2023 Talent Connect. All rights reserved
            </Text>
            <Text fontWeight="bold">Follow Us</Text>
            <Stack direction="row" spacing={4}>
              <SocialButton label="Follow us on Instagram" href="https://www.instagram.com">
                <FaInstagram />
              </SocialButton>
              <SocialButton label="Follow us on LinkedIn" href="https://www.linkedin.com">
                <BsLinkedin />
              </SocialButton>
              <SocialButton label="Follow us on Twitter" href="https://twitter.com">
                <FaTwitter />
              </SocialButton>
              <SocialButton label="Subscribe to us on YouTube" href="https://www.youtube.com">
                <FaYoutube />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <Text fontWeight="bold">
              <a href="/Home">Home</a>
            </Text>
            <Text fontWeight="bold">
              <Link to="/">DashBoard</Link>
            </Text>
            
          </Stack>
          <Stack spacing={4}>
            <Text fontWeight="bold">
              <Link to="/">Referrals</Link>
            </Text>
           
            <Stack spacing={4}>
              <Text fontWeight="bold">
                <Link to="/">Earning</Link>
              </Text>
              <Text fontWeight="bold">
                <Link to="/Resources">Resources</Link>
              </Text>
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <Text fontWeight="bold">
              <Link to="/support">Support</Link>
            </Text>
            <Stack spacing={4}>
              <Text fontWeight="bold">
                <Link to="/profile">Profile</Link>
              </Text>
              <Text fontWeight="bold">
                <Link to="/setting">Settings</Link>
              </Text>
              <Text fontWeight="bold">
                <Link to="/logout">Logout</Link>
              </Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
