import React, { useState, useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Alert,
  AlertIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const FormMessage = ({ message, status }) => (
  message ? (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  ) : null
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAffiliate } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "", resetCode: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`${apiUrl}/api/affiliate/login`, { email: formData.email, password: formData.password });
      if (response.data.token && response.data.affiliate) {
        loginAffiliate(response.data.token, response.data.affiliate.id);
        navigate("/affiliate-dashboard");
      } else {
        setError("Login failed. No token or affiliate data received.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${apiUrl}/api/affiliate/forgot-password`, { email: formData.email });
      setIsCodeSent(true);
      setSuccess("Reset code sent successfully. Please check your email.");
      setTimer(60);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) clearInterval(countdown);
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Failed to send reset code. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post(`${apiUrl}/api/affiliate/reset-password`, {
        email: formData.email,
        otp: formData.resetCode,
        newPassword: formData.newPassword,
      });
      setForgotPassword(false);
      setIsCodeSent(false);
      setFormData({ ...formData, password: "", resetCode: "", newPassword: "", confirmPassword: "" });
      setSuccess("Password reset successfully. You can now log in.");
    } catch (err) {
      setError("Password reset failed. Please check your code and try again.");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      mt={"50"}
    >
      <Flex w="full" maxW="1200px" mx="auto" direction={{ base: "column", lg: "row" }}>
        <Box flex="1" p={10}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"}>
            <Stack align={"center"} spacing={4}>
              <Flex justify="center" mb={4}>
                <FaUserFriends size={64} color={useColorModeValue("blue.400", "blue.300")} />
              </Flex>
              <Text fontSize={"lg"} color={"gray.600"}>
                Welcome back, Affiliate!
              </Text>
            </Stack>
            <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormMessage message={error} status="error" />
                <FormMessage message={success} status="success" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  isRequired
                />
                {forgotPassword ? (
                  isCodeSent ? (
                    <>
                      <Input
                        type="text"
                        name="resetCode"
                        value={formData.resetCode}
                        onChange={handleChange}
                        placeholder="Enter Reset Code"
                        isRequired
                      />
                      <InputGroup>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="New Password"
                          isRequired
                        />
                        <InputRightElement>
                          <Button variant="ghost" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <InputGroup>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm New Password"
                          isRequired
                        />
                        <InputRightElement>
                          <Button variant="ghost" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <Button colorScheme="blue" onClick={handleResetPassword}>
                        Reset Password
                      </Button>
                    </>
                  ) : (
                    <Button colorScheme="blue" onClick={handleForgotPassword} isDisabled={timer > 0}>
                      {timer === 0 ? "Send Reset Code" : `Resend Code in ${timer}s`}
                    </Button>
                  )
                ) : (
                  <>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        isRequired
                      />
                      <InputRightElement>
                        <Button variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Button bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500" }} onClick={handleLogin}>
                      Sign In
                    </Button>
                    <Button variant="link" color={"blue.400"} onClick={() => setForgotPassword(true)}>
                      Forgot Password?
                    </Button>
                  </>
                )}
                <Stack pt={6} spacing={4}>
                  <Text align={"center"}>
                    New Affiliate?{" "}
                    <ChakraLink color={"blue.400"} onClick={() => navigate("/affiliate-form")} as="span" cursor="pointer">
                      Register Now
                    </ChakraLink>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box flex="1" p={8} display={{ base: "none", lg: "flex" }} flexDirection="column" alignItems="center" justifyContent="center">
          <Stack spacing={4} textAlign="center">
            <Heading fontSize={"4xl"} mb={4}>Affiliate Sign In</Heading>
            <Image src={"https://d24xhk2f9wq8ku.cloudfront.net/assets/Affiliate/login.svg"} alt="Login Illustration" objectFit="cover" />
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
