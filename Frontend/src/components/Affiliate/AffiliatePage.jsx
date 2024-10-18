import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AffiliatePage = () => {
  return (
    <Box
      color="blue.400"
      py={{ base: 8, md: 16, lg: 20 }}
      px={{ base: 4, md: 8, lg: 12 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="center">
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl", lg: "2xl", xl: '3xl' }}
            textAlign="center"
            fontFamily="ClashDisplay"
            color="blue.600"
          >
            Elevate Your Workforce with TalentConnect's Affiliate Program
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg", lg: "lg", xl: 'xl' }}
            textAlign="center"
            maxW={{ base: "90%", md: "80%", lg: "60%" }}
            color="black"
          >
            TalentConnect's Affiliate Program offers a unique opportunity for experienced professionals to tap into their extensive network and refer top-tier talent to their organization.
          </Text>
          <HStack
            spacing={{ base: 2, md: 4 }}
            flexWrap="wrap"
            justify="center"
            width="100%"
          >
            <Link to="/affiliate-form">
              <Button
                size={{ base: "md", md: "md", xl: "lg" }}
                bg="blue.400"
                rounded="full"
                color="white"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                mb={{ base: 2, md: 0 }}
              >
                Join as an Affiliate
              </Button>
            </Link>
            <Link to="/affiliate-login">
              <Button
                size={{ base: "md", md: "md", xl: "lg" }}
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
