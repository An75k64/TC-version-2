import {
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function About() {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  // Responsive sizes and styles
  const paddingY = useBreakpointValue({ base: 3, sm: 4, md: 5, lg: 6, xl: 6, "2xl": 7, "3xl": "14" });
  const headingSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "5xl" , xl: "5xl", "2xl": "6xl", "3xl": "8xl" });
  const textSize = useBreakpointValue({ base: "md", sm: "md", md: "md", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "5xl" });
  const videoSize = useBreakpointValue({ base: "100%", sm: "100%", md: "100%", lg: "90%", xl: "100%", "2xl": "100%", "3xl": "100%" });
  const pScreenX = useBreakpointValue({ base: 3, sm: 4, md: 4, lg: 10, xl: 6, "2xl": 7, "3xl": 14 });
  const pscreenY = useBreakpointValue({ base: 10, sm: 10, md: 10, lg: 20, xl: 2, "2xl": 0, "3xl": 7 });
  
  // Dynamic text color for mobile
  const textColor = useBreakpointValue({ base: "teal.600", lg: "black" });

  // Framer-motion variants for text animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      spacing={4}
      maxW={{ base: "100%", lg: "1200px", xl: "1440px", "2xl": "2560px" }}
      mx={"auto"}
      px={pScreenX}
      py={pscreenY}
      position={"relative"}
      overflow={"hidden"}
      backgroundImage={"https://d3g8ff7g609hps.cloudfront.net/assets/Home/aboutbg.webp"}
      bgSize={"125%"}
      backgroundRepeat={"no-repeat"}
      backgroundColor={"white"}
      zIndex={1}
    >
      {/* Video for Desktop and Larger Screens */}
      {!isMobile && (
        <Flex flex={1} align={"center"} justify={"flex-start"} position={"relative"}>
          <Box
            borderRadius={"lg"}
            p={paddingY}
          >
            <Box
              w="100%"
              display="flex"
              justifyContent="center"
              as={motion.div}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              _hover={{
                transform: "scale(1.03)",
                borderColor: "blue.400",
                boxShadow: "0 0 20px rgba(255, 215, 0, 1)",
                transition: "all 0.4s ease",
                borderRadius: "lg",
              }}
            >
              <video
                key="desktop-video"
                controls
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: videoSize,
                  borderRadius: "8px",
                  border: "2px solid transparent",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                src="https://d3g8ff7g609hps.cloudfront.net/assets/Home/aboutUs.webm"
                aria-label="Promotional video for TalentConnect"
              />
            </Box>
          </Box>
        </Flex>
      )}

      <Flex p={0} flex={1} align={"center"} justify={"center"} position={"relative"}>
        <Stack spacing={6} h={{ base: "auto", xl: "80vh" }} w={"full"} maxW={{ base: "320px", sm: "375px", md: "425px", lg: "768px", xl: "1024px", "2xl": "1440px", "3xl": "2560px" }}>
          <Heading
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={headingSize}
            color={textColor}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Text
              as={"span"}
              position={"relative"}
            >
              About Us
            </Text>
            <br />
            <Text color={"blue.400"} as={"span"}>
              At TalentConnect,
            </Text>
          </Heading>
          <Text
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={textSize}
            color={textColor} // Apply dynamic text color
          >
            We are dedicated to bridging the gap between talented individuals and the dynamic workforce.
          </Text>

          {/* Video for Mobile */}
          {isMobile && (
            <Flex flex={1} align={"center"} justify={"center"} position={"relative"}>
              <Box
                w={videoSize}
                maxW="800px"
                borderRadius={"lg"}
                maxHeight="60vh"
              >
                <Box
                  w="100%"
                  display="flex"
                  justifyContent="center"
                  as={motion.div}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  _hover={{
                    transform: "scale(1.03)",
                    borderColor: "blue.400",
                    boxShadow: "0 0 20px rgba(255, 215, 0, 1)",
                    transition: "all 0.4s ease",
                    borderRadius: "lg",
                  }}
                >
                  <video
                    key="mobile-video"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: videoSize,
                      height: "auto",
                      borderRadius: "8px",
                      border: "2px solid transparent",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    src={"https://d3g8ff7g609hps.cloudfront.net/assets/Home/aboutUs.webm"}
                    aria-label="Promotional video for TalentConnect"
                  />
                </Box>
              </Box>
            </Flex>
          )}

          <Text
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={textSize}
            color={textColor} // Apply dynamic text color
          >
            Our mission is to provide top-notch career services that empower individuals to achieve their professional aspirations while supporting organizations in building their dream teams.
          </Text>
          <Text
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={textSize}
            color={textColor} // Apply dynamic text color
          >
            With a commitment to excellence, innovation, and integrity, TalentConnect is your trusted partner in career success.
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}
