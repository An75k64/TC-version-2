import React from 'react';
import { Box, Heading, Text, VStack, Container, Flex, Icon, Badge } from '@chakra-ui/react';
import { FaUserPlus, FaDollarSign, FaHandshake, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { chakra } from '@chakra-ui/react';

const MotionBox = chakra(motion.div); 

const steps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Join TalentConnect's Affiliate Program by completing the registration.",
    icon: FaUserPlus,
  },
  {
    number: "2",
    title: "Start Referring",
    description: "Refer candidates to start earning rewards for successful placements.",
    icon: FaHandshake,
  },
  {
    number: "3",
    title: "Earn Commission",
    description: "Get up to 20% commission on each successful placement you facilitate.",
    icon: FaDollarSign,
  },
  {
    number: "4",
    title: "Track Progress",
    description: "Track your referrals and commissions in your personal dashboard.",
    icon: FaChartLine,
  },
];

const AffiliateIntro = () => {
  return (
    <Box
      bg="white"
      py={{ base: 10, md: 20 }}
      px={{ base: 5, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        {/* Split Layout */}
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          {/* Left Side: Heading and Description */}
          <VStack spacing={6} align={{ base: 'center', md: 'flex-start' }} w={{ base: '100%', md: '45%' }}>
            <Heading
              as="h1"
              size={{ base: "2xl", md: '3xl' }}
              fontFamily="ClashDisplay"
              bgGradient="linear(to-r, purple.500, blue.500)"
              bgClip="text"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Why Join TalentConnect's Affiliate Program?
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              textAlign={{ base: 'center', md: 'left' }}
              color="gray.700"
            >
              Leverage your network, access exclusive tools, and earn rewards by connecting top-tier talent with the right opportunities.
            </Text>
          </VStack>

          {/* Right Side: Step Cards */}
          <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justify="space-between" w={{ base: '100%', md: '50%' }} mt={{ base: 8, md: 0 }}>
            {steps.map((step) => (
              <MotionBox
                key={step.number}
                bg="gray.50"
                p={8}
                borderRadius="lg"
                boxShadow="lg"
                mb={8}
                w={{ base: '100%', md: '48%' }}
                whileHover={{ scale: 1.05, boxShadow: 'xl' }}
                transition="0.3s"
                position="relative"
                cursor={'pointer'}
              >
                {/* Large Step Number in Background */}
                <Text
                  position="absolute"
                  top="-20px"
                  left="-20px"
                  fontSize="6xl"
                  color="purple.100"
                  fontWeight="bold"
                  zIndex={-1}
                >
                  {step.number}
                </Text>

                {/* Icon Badge */}
                <Badge
                  borderRadius="full"
                  p={4}
                  mb={4}
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon as={step.icon} w={8} h={8} color="white" />
                </Badge>

                {/* Step Title and Description */}
                <Heading as="h3" size="md" mb={2} color="purple.700">
                  {step.title}
                </Heading>
                <Text fontSize="md" color="gray.600">
                  {step.description}
                </Text>
              </MotionBox>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default AffiliateIntro;
