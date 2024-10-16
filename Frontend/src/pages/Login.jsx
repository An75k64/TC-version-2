import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Alert,
  AlertIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { FaUserFriends } from "react-icons/fa"; // Only keeping Affiliate icon
import LoginImage from "../assets/images/Login/log.svg"; // Adjust image import if needed
import axios from "axios"; // Import axios for making API requests


const apiUrl = import.meta.env.VITE_API_BASE_URL;

const FormError = ({ error }) =>
  error ? (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  ) : null;

export default function LoginPage() {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const response = await axios.post(`${apiUrl}/api/affiliate/login`, formData); // Update the URL based on your backend setup
      console.log("Login successful", response.data);
      // Handle successful login (e.g., save token, redirect)
      navigate("/affiliate-dashboard"); // Redirect to dashboard or appropriate page
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const toggleSignUp = () => {
    navigate("/affiliate-form"); // Redirect to the affiliate form
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      mt={"50"}
    >
      <Flex
        w="full"
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
      >
        {/* Login Form */}
        <Box flex="1" p={10}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"}>
            <Stack align={"center"} spacing={4}>
              <Flex justify="center" mb={4}>
                <FaUserFriends
                  boxSize={10}
                  color={useColorModeValue("blue.400", "blue.300")}
                  zIndex="docked"
                />
              </Flex>
              <Text fontSize={"lg"} color={"gray.600"}>
                Welcome back, Affiliate!
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  isRequired
                />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  isRequired
                />
                <FormError error={error} />
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Stack pt={6} spacing={4}>
                  <Text align={"center"}>
                    New Affiliate?{" "}
                    <ChakraLink
                      color={"blue.400"}
                      onClick={toggleSignUp} // Redirects to affiliate form
                      as="span"
                      cursor="pointer"
                    >
                      Register Now
                    </ChakraLink>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box
          flex="1"
          p={8}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Stack spacing={4} textAlign="center">
            <Heading fontSize={"4xl"} mb={4}>
              Affiliate Sign In
            </Heading>
            <Image
              src={LoginImage}
              alt="Login Illustration"
              objectFit="cover"
            />
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
