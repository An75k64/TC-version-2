import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
  HStack,
  Image,
  Stack,
  useBreakpointValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import affiliateImage from "../../assets/images/1688543157326.png";

const AffiliateHero = () => {
  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate("/login"); // Change this path to match your Affiliate Sign In route
  };

  return (
    <Box
      color="blue.400"
      py={useBreakpointValue({ base: 20, md: 20, lg: 20 })}
      px={useBreakpointValue({ base: 5, md: 5, lg: 10 })}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={10}
          align="center"
        >
          <VStack spacing={8} align="start" maxW="lg">
            <Heading
              as="h1"
              size={{ base: "xl", lg: 'xl', xl: "2xl" }}
              fontFamily={"ClashDisplay"}
              textAlign={{ base: "center", lg: "left" }}
            >
              Empower Careers Together
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "lg", xl: 'xl' }}
              textColor="black"
              textAlign={{ base: "center", lg: "left" }}
            >
              Join our affiliate program and become a part of the TalentConnect
              network. As an affiliate, you can help us reach more job seekers
              and employers, expanding our impact and creating more
              opportunities for success.
            </Text>
            <HStack
              spacing={4}
              pl={useBreakpointValue({ base: 5, sm: 24, lg: 0 })}
              justifyContent={{ base: "center", lg: "flex-start" }}
            >
              <Button
                size={useBreakpointValue({ base: "md", lg: "md", xl: "lg" })}
                bg="blue.400"
                rounded="full"
                color="white"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                onClick={handleSignInRedirect}
              >
                Post a Job
              </Button>
              {/* <Button
                size={{ base: "md", lg: "lg" }}
                bg="gray.300"
                rounded="full"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                onClick={handleSignInRedirect}
              >
                Login
              </Button> */}
            </HStack>
          </VStack>

          <Box
            position="relative"
            w={{ base: "100%", lg: "100%", xl: "100%" }}
            mt={{ base: 10, lg: 0 }}
            ml={{ base: 0, lg: 20, xl: 40 }}
            display="flex"
            justifyContent={{ base: "center", lg: "flex-end" }}
          >
            {/* Bubble animation */}
            <Box
              position="absolute"
              top="-10px"
              right="-10px"
              w="60px"
              h="50px"
              bg="green.300"
              borderRadius="full"
              animation="bubble 5s infinite"
              zIndex="1"
            />
            <Box
              position="absolute"
              top="50%"
              left="-20px"
              w="60px"
              h="60px"
              bg="yellow.400"
              borderRadius="full"
              animation="bubble 7s infinite"
              zIndex="1"
            />
            <Box
              position="absolute"
              bottom="-30px"
              right="30%"
              w="90px"
              h="90px"
              bg="blue.300"
              borderRadius="full"
              animation="bubble 9s infinite"
              zIndex="1"
            />
            <Image
              src={affiliateImage}
              alt="Affiliate Marketing"
              borderRadius="20px"
              boxShadow="lg"
              zIndex="2"
              position="relative"
              w={{ base: "90%", md: "80%", lg: "100%", xl: "100%" }} // Responsive width for image
            />
          </Box>
        </Stack>
      </Container>
      {/* Keyframes for bubble animation */}
      <style>
        {`
          @keyframes bubble {
            0% { transform: scale(1) translateY(0); opacity: 1; }
            50% { transform: scale(1.5) translateY(-10px); opacity: 0.7; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default AffiliateHero;
