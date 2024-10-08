import React from 'react';
import { Box, Heading, Text, VStack, Container, Flex, Icon } from '@chakra-ui/react';
import { FaUserPlus, FaDollarSign, FaHandshake, FaChartLine } from 'react-icons/fa';

const steps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Fill out the registration form to join the TalentConnect Affiliate Program.",
    icon: FaUserPlus,
  },
  {
    number: "2",
    title: "Start Referring",
    description: "Begin referring candidates and earn rewards for successful placements.",
    icon: FaHandshake,
  },
  {
    number: "3",
    title: "Earn Commission",
    description: "Earn up to 20% commission on every successful job placement facilitated.",
    icon: FaDollarSign,
  },
  {
    number: "4",
    title: "Track Your Progress",
    description: "Use our dashboard to track your referrals and manage your earnings.",
    icon: FaChartLine,
  },
];

const AffiliateIntro = () => {
  return (
    <Box
      bg="yellow.100"
      py={{ base: 10, md: 20 }}
      px={{ base: 5, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="center">
          <Heading as="h1" size="2xl" textAlign="center"  fontFamily={"ClashDisplay"} color={"blue.400"} >
            Why Join TalentConnect's Affiliate Program?
          </Heading>
          <Text fontSize="xl" textAlign="center" maxW="800px">
            Discover the advantages of becoming a TalentConnect affiliate. Our program offers you the chance to leverage your professional network, access exclusive tools, and earn rewards by connecting top-tier talent with the right opportunities.
          </Text>

          <Box width="100%" maxW="full">
            
            <Flex justify="space-around" wrap="wrap" spacing={4}>
              {steps.map((step) => (
                <Box
                  key={step.number}
                  textAlign="center"
                  width={{ base: "full", md: "24%" }}
                >
                  <Icon as={step.icon} color="blue.400" w={10} h={10} mb={4} mx="auto" />
                  <Heading as="h3" size="md" mb={2}>
                    <Text as="span" fontSize="lg" fontWeight="bold" color="blue.500">
                      {step.number}.
                    </Text>
                    {" "}{step.title}
                  </Heading>
                  <Text>{step.description}</Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AffiliateIntro;
