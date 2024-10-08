import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AffiliatePage = () => {
  return (
    <Box
      
      color="blue.400"
      py={{ base: 10, md: 20 }}
      px={{ base: 5, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="center">
          <Heading as="h1" size="2xl" textAlign="center" fontFamily={"ClashDisplay"}>
            Elevate Your Workforce with TalentConnect's Affiliate Program
          </Heading>
          <Text fontSize="xl" textAlign="center" maxW="600px" textColor="black">
            TalentConnect's Affiliate Program offers a unique opportunity for experienced professionals to tap into their extensive network and refer top-tier talent to their organization.
          </Text>
          <HStack spacing={4}>
            <Link to="/affiliate-form">
            <Button
              size="lg"
              bg="blue.400"
              rounded="full"
              color="white"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            >
              Join as an Affiliate
            </Button>
            </Link>
            <Link to="/login">
            <Button
              size="lg"
              bg="gray.300"
              rounded="full"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            >
              Refer Talent Now
            </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default AffiliatePage;
