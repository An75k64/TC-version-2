import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Box, Flex, Heading, Text, Button, useColorModeValue, VStack, Container } from '@chakra-ui/react';
import backgroundImage from '../../assets/images/8c0b275e-06cd-45f5-9ceb-0d58ace2fb1e.jpg'; // Adjust path as needed

// Confetti function to trigger confetti on page load
const triggerConfetti = () => {
  const end = Date.now() + 2.5 * 1000; // 2.5 seconds
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};

const HeroAffiliate = () => {
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <Box
      position="relative"
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"  // Cover ensures the image covers the entire area
      bgPosition="center"
      bgRepeat="no-repeat"
      color="white"
      py={{ base: 12, md: 20 }} // Responsive padding
      minH={{ base: '50vh', md: '50vh', lg: '25vh' }} // Responsive minimum height
      textAlign="center" // Center text on small screens
    >
      <Container maxW={{ base: 'container.sm', md: 'container.md', lg: 'container.lg' }}>
        <Flex direction="column" align="center" justify="center" height="100%">
          <VStack spacing={{ base: 6, md: 8 }} align="center">
            <Heading as="h1" fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }} fontWeight="bold" fontFamily={"ClashDisplay"}
                color={"blue.400"}>
              Welcome to the Affiliate Dashboard
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
              We are excited to have you on board! Explore your new dashboard to manage your affiliate activities, track your earnings, and more.
            </Text>
            
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroAffiliate;
