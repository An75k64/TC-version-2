import React from 'react';
import { Box, Flex, Heading, Text, Button, Image, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const AffiliateHero = () => {
  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate("/affiliate-login");
  };

  // Use different background images based on the screen size
  const bgImage = useBreakpointValue({
    base: "https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/HeroSection-Mobile.webp",
    lg: "https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/HeroSection-Tab.webp",
  });

  // Responsive font sizes
  const headingSize = useBreakpointValue({
    base: "2xl", sm: "3xl", md: "4xl", lg: "4xl", xl: "6xl", "2xl": "6xl", "3xl": "9xl"
  });

  const textSize = useBreakpointValue({
    base: "sm", sm: "sm", md: "sm", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "6xl"
  });

  return (
    <Box as="header" w="full" h={useBreakpointValue({ base: "150vh", lg: "100vh", xl:"125vh" })} position="relative" zIndex={1}>
      {/* Background Image */}
      <Image
        loading="lazy"
        src={bgImage}
        alt="Illustration of people working together"
        objectFit={useBreakpointValue({ base: "cover", lg: "fit", xl:"cover" })}
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex={1} // Ensure it's behind content in AffiliateIntro
      />

      {/* Content */}
      <Flex
        direction="column"
        align={useBreakpointValue({ base: "center", lg: "flex-start" })}
        justify="center"
        zIndex={2}
        position="relative"
        p={useBreakpointValue({ base: 4, md: 8 })}
        color="white"
        height="100%"
        textAlign={useBreakpointValue({ base: "center", lg: "left" })}
      >
        <Box w="full" maxW={{ base: "90%", md: "90%", lg: "50%" }} mt={useBreakpointValue({ base: -80, md: -60 , lg:0,xl:-40 , "3xl": -80})}
            paddingLeft={useBreakpointValue({"2xl":10 , "3xl":20})}
        >
          <Heading
            as="h1"
            fontSize={headingSize}
            fontWeight="bold"
            lineHeight="1.2"
            color="blue.500"
            mb={4}
          >
            <Box as="span" color="black" display="block">
              Empower
            </Box>
            Careers Together
          </Heading>
          <Text fontSize={textSize} lineHeight="1.5" color="black" mb={6}>
            Join our affiliate program and become a part of the TalentConnect
            network. As an affiliate, you can help us reach more job seekers
            and employers, expanding our impact and creating more
            opportunities for success.
          </Text>
          <Button
            px={useBreakpointValue({base:"8", "3xl": "16"})}
            py={useBreakpointValue({base:"6","3xl":"16"})}
            fontSize={useBreakpointValue({base:"xl","3xl":"5xl"})}
            colorScheme="blue"
            bg="blue.500"
            color="white"
            rounded="full"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            onClick={handleSignInRedirect}
          >
            Post a Job
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default AffiliateHero;