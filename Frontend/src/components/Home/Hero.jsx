import React, { useState, useEffect } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";

// Array of video URLs
const videos = [
  "https://d24xhk2f9wq8ku.cloudfront.net/assets/Home/hero.mp4",
];

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const buttonSizes = useBreakpointValue({ base: "sm", sm: "sm", md: "sm", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl", });
  const px = useBreakpointValue({ base: 2, sm: 2, md: 2, lg: 4, xl: 6, "2xl": 8, "3xl": 12 });
  const py = useBreakpointValue({ base: 2, sm: 2, md: 2, lg: 4, xl: 6, "2xl": 8, "3xl": 12 });
  const spacing = useBreakpointValue({ base: 2, sm: 3, md: 3, lg: 5, xl: 6, "2xl": 7, "3xl": 10 });
  const sizeHeading = useBreakpointValue({ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl", xl: "7xl", "2xl": "8xl", "3xl": "9xl" });
  const sizeText = useBreakpointValue({ base: 'md', sm: 'lg', md: 'lg', lg: "lg", xl: "xl", "2xl": "3xl", "3xl": "5xl" });

  // Change video at intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <Flex
      w={"full"}
      h={"100vh"}
      position={"relative"}
      overflow={"hidden"}
      align={"center"}
      justify={"center"}
    >
      {/* Import Google Font */}

<style>
@import url('https://fonts.googleapis.com/css2?family=Almendra:ital,wght@0,400;0,700;1,400;1,700&display=swap');
</style>


      {/* Video Background */}
      <video
        key={currentVideoIndex}
        autoPlay
        loop
        muted
        playsInline
        src={videos[currentVideoIndex]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          transition: "opacity 1s ease-in-out",
          filter: "brightness(0.7)", // Increase brightness (1.5 can be adjusted)
        }}
      />

      {/* Gradient Overlay */}
      <VStack
        w={"full"}
        h={"full"}
        justify={"center"}
        px={px}
        bgGradient={"linear(to-l, rgba(0, 0, 0, 0.6), transparent)"}
        position={"relative"}
        spacing={spacing}
        align={"center"}
        
      >
        <Stack
          maxW={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "75%", "2xl": "75%" }}
          spacing={spacing}
          textAlign={"center"}
          as={motion.div}
          initial={{ opacity: 0, y: -100 }}  // Start from top (y: -100)
          animate={{ opacity: 1, y: 0 }}     // Animate to center (y: 0)
          transition={{ duration: 1 }}        // Smooth transition over 1 second
        >
          <Text
            color={"#FF8C00"}
            fontWeight={700}
            lineHeight={1.1}
            fontSize={sizeHeading}
            mt={{"2xl":"40"}}
            fontFamily= {'Almendra, serif'} // Apply the font family
            
            as={motion.div}
            initial={{ y: "-100vh" }}          // Start off-screen to the top
            animate={{ y: 0 }}                 // Move to original position
            transition={{ type: "tween", duration: 1, delay: 0.5 }} // Smooth transition
          >
            Welcome to TalentConnect !
          </Text>
          <Text
            color={"#FFFFFF"}
            fontWeight={600}
            fontSize={sizeText}
            as={motion.div}
            initial={{ y: "-100vh" }}          // Start off-screen to the top
            animate={{ y: 0 }}                 // Move to original position
            transition={{ type: "tween", duration: 1, delay: 0.7 }} // Delayed transition
          >
            Your premier destination for comprehensive career solutions. Whether
            you're a job seeker, an employer, or an academic institution, we
            connect talent with opportunity.
          </Text>
          <Stack
            direction={"row"}
            spacing={spacing} // Responsive spacing between buttons
            justify={"center"}
            mt={6}
          >
            <Link to="/#our-services">
              <Button
                as={motion.button}
                fontSize={buttonSizes} // Responsive font size
                px={px} // Responsive horizontal padding
                py={py} // Responsive vertical padding
                bgGradient="linear(to-r, teal.400, blue.500)"
                rounded={"full"}
                color={"white"}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Learn More
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                as={motion.button}
                fontSize={buttonSizes} // Responsive font size
                px={px} // Responsive horizontal padding
                py={py} // Responsive vertical padding
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Contact Us
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
