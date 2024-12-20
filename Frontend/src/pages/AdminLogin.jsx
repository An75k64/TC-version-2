import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Input, Text, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const backgroundImage = 'url(https://d3g8ff7g609hps.cloudfront.net/assets/Admin/login.webp)';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (!canResend && isForgotPassword) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend, isForgotPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/login`, { username, password });
      login(response.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/forgot-password`, { username });
      setMessage('The OTP has been sent to the registered Gmail ID.');
      setIsForgotPassword(true);
      setCanResend(false);
      setTimer(90);
    } catch (err) {
      setMessage('Error sending password reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/reset-password`, { username, otp, newPassword });
      setMessage('Password has been reset successfully.');
      setIsForgotPassword(false);
    } catch (err) {
      setMessage('Error resetting password.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (canResend) {
      setLoading(true);
      try {
        await axios.post(`${apiUrl}/api/forgot-password`, { username });
        setMessage('Password reset code resent to your email.');
        setCanResend(false);
        setTimer(90);
      } catch (err) {
        setMessage('Error resending password reset code.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        bg="rgba(248, 246, 240)"
        opacity={0.9}      
        borderRadius="lg"
        p="8"
        boxShadow="lg"
        width={{ base: "90%", sm: "70%", md: "50%", lg: "30%" }}
      >
        <Text fontSize="2xl" mb="4" textAlign="center">
          {isForgotPassword ? 'Reset Password' : 'Admin Login'}
        </Text>
        {error && <Text color="red.500" mb="4" textAlign="center">{error}</Text>}
        {message && <Text color="green.500" mb="4" textAlign="center">{message}</Text>}
        <form onSubmit={isForgotPassword ? handleResetPassword : handleLogin}>
          {!isForgotPassword ? (
            <>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb="4"
                size="lg"
                isDisabled={loading}
              />
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mb="4"
                  isDisabled={loading}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                mb="4"
                size="lg"
                isLoading={loading}
              >
                Login
              </Button>
              <Button
                variant="link"
                onClick={handleForgotPasswordSubmit}
                size="sm"
                colorScheme="teal"
                width="full"
                isDisabled={loading}
              >
                Forgot Password?
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb="4"
                size="lg"
                isDisabled={loading}
              />
              <Input
                placeholder="Reset Code"
                value={otp}
                onChange={(e) => setResetCode(e.target.value)}
                mb="4"
                size="lg"
                isDisabled={loading}
              />
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  mb="4"
                  isDisabled={loading}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  mb="4"
                  isDisabled={loading}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
             
              <Button
                variant="link"
                onClick={handleResetPassword}
                type="submit"
                colorScheme="teal"
                width="full"
                mb="4"
                size="lg"
                isLoading={loading}
              >
                Reset Password
              </Button>
              <Button
                variant="link"
                onClick={handleResendCode}
                colorScheme="teal"
                isDisabled={!canResend || loading}
              >
                {canResend ? 'Resend Code' : `Resend Code in ${timer}s`}
              </Button>
            </>
          )}
        </form>
      </Box>
    </Flex>
  );
};

export default AdminLogin;
