import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  AspectRatio,
  Image,
  Box,
  keyframes,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import dimg from "../../assets/images/ud.jpg";

// Define the keyframes for the rectangular moving animation
const movingAnimation = keyframes`
  0% { transform: translateX(0) translateY(0); background-color: rgba(255, 0, 0, 0.3); }
  50% { transform: translateX(10%) translateY(10%); background-color: rgba(0, 255, 0, 0.3); }
  100% { transform: translateX(0) translateY(0); background-color: rgba(0, 0, 255, 0.3); }
`;

// Reusable AnimatedBox component for the moving animation
const AnimatedBox = ({ children, imageSize }) => (
  <Box position="relative" width={imageSize} maxW="100%">
    <Box
      position="absolute"
      top={-5}
      left={-5}
      width="calc(100% + 0px)"
      height="calc(100% + 0px)"
      borderRadius="lg"
      zIndex={-1}
      animation={`${movingAnimation} 5s infinite ease-in-out`}
      willChange="transform"
    />
    {children}
  </Box>
);

// Custom MotionText component for reusability
const MotionText = ({ children, fontSize, color }) => (
  <Text
    as={motion.div}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    }}
    initial="hidden"
    whileInView="visible"
    fontSize={fontSize}
    color={color}
  >
    {children}
  </Text>
);

export default function CampusToCubicle() {
  const handleGetStartedClick = () => {
    setTimeout(() => {
      const connectusSection = document.getElementById("connectus");
      if (connectusSection) {
        connectusSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 10);
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });

  // Responsive sizes
  const buttonSizes = useBreakpointValue({ base: "sm", sm: "md", md: "md", lg: "md", xl: "md", "2xl": "xl", "3xl": "5xl" });
  const paddingX = useBreakpointValue({ base: 3, sm: 4, md: 5, lg: 6, xl: 6, "2xl": 7, "3xl": "14" });
  const pX = useBreakpointValue({ base: 3, sm: 4, md: 5, lg: 10, xl: 20, "2xl": 7, "3xl": "14" });
  const paddingY = useBreakpointValue({ base: 2, sm: 4, md: 5, lg: 6, xl: 6, "2xl": 7, "3xl": "14" });
  const pY = useBreakpointValue({ base: 10, sm: 10, md: 10, lg: 10, xl: 20, "2xl": 20, "3xl": "40" });
  const imageSize = useBreakpointValue({ base: "90%", sm: "90%", md: "90%", lg: "60%", xl: "100%", "2xl": "100%", "3xl": "100%" });
  const headingSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "5xl", "2xl": "6xl", "3xl": "8xl" });
  const textSize = useBreakpointValue({
    base: "sm", sm: "md", md: "md", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "5xl"
  });

  return (
    <Stack
      //minH={"90vh"}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      maxW={{ base: "100%", lg: "1200px", xl: "1440px", "2xl": "2560px", "3xl": "100%" }}
      mx={"auto"}
      px={pX}
      py={pY}
      position={"relative"}
      overflow={"hidden"}
      zIndex={1}
      backgroundImage={"https://i.postimg.cc/GpHzV4M0/cc.png"}
      bgSize={"100%"}
    >
      <Flex p={0} flex={1} align={"center"} justify={"center"} position={"relative"}>
        <Stack spacing={6} w={"full"} maxW={{ base: "320px", sm: "375px", md: "425px", lg: "768px", xl: "1024px", "2xl": "1440px", "3xl": "2560px" }}>
          <Heading
            as={motion.div}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
            initial="hidden"
            whileInView="visible"
            fontSize={headingSize}
            mb={10}
            display={"flex"}
          >
            <Text as={"span"} position={"relative"}
              // _after={{
              //   content: "''",
              //   width: "full",
              //   height: useBreakpointValue({ base: "20%", md: "30%" }),
              //   position: "absolute",
              //   bottom: 1,
              //   left: 0,
              //   bg: "blue.400",
              //   zIndex: -1,
              // }}
              color={"white"}
            >
              Campus To
            </Text>
            <br />
          </Heading>

          {/* <MotionText fontSize={textSize} color={"#000000"}>
            TalentConnect, the trailblazing tech startup redefining the campus-to-cubicle journey. We transform campus hiring by integrating company requirements into our tech platform to engage with colleges.
          </MotionText> */}

          {/* <Heading flex={1} align={"center"} justifyContent={"center"} mt={-36} marginLeft={20}  position={"relative"}>
            <Text color={"white"} >To</Text>
          </Heading> */}
          {/* Image for Mobile */}
          {isMobile && (
            <Flex flex={1} align={"center"} justifyContent={"center"} mt={5} position={"relative"}>
              <AnimatedBox imageSize={imageSize}>
                <AspectRatio ratio={3 / 1.9} >
                  <Image src={dimg} alt="Campus to Cubicle" objectFit="cover" />
                </AspectRatio>
              </AnimatedBox>
            </Flex>
          )}

          <MotionText fontSize={textSize} color={"white"}>
            TalentConnect collaborates with campuses nationwide, integrating companies’ hiring needs directly into college recruitment. We support students’ career journeys by aligning academic skills with real-world demands. Through targeted sessions, we prepare students for job roles even before they graduate.
          </MotionText>

          <Stack direction={{ base: "column", md: "row" }} spacing={4} justify={{ md: "center", xl: "flex-start" }}>
            <Button
              as={RouterLink}
              to="/campus-to-cubicle#connectus"
              rounded={"full"}
              color={"teal"}
              fontSize={buttonSizes}
              px={paddingX}
              py={paddingY}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                bg: "blue.300",
                color: "white",
                transition: "all 0.2s ease-in-out",
              }}
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Flex>

      {/* Image for Desktop and Larger Screens */}
      {!isMobile && (
        <Flex flex={1} align={"center"} justifyContent={"center"} p={10} position={"relative"}>
          <AnimatedBox imageSize={imageSize}>
            <AspectRatio ratio={3 / 1.9} width="100%">
              <Image src="https://d24xhk2f9wq8ku.cloudfront.net/assets/Home/cc.jpeg" alt="Campus to Cubicle" objectFit="cover" />
            </AspectRatio>
          </AnimatedBox>
        </Flex>
      )}

      <Flex p={0} flex={1} align={"center"} justify={"center"} position={"relative"}>
        <Stack spacing={6} w={"full"} maxW={{ base: "320px", sm: "375px", md: "425px", lg: "768px", xl: "1024px", "2xl": "1440px", "3xl": "2560px" }}>
          <Heading
            as={motion.div}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
            initial="hidden"
            whileInView="visible"
            fontSize={headingSize}
            mb={4}
          >
            <Text as={"span"} position={"relative"}
            // _after={{
            //   content: "''",
            //   width: "full",
            //   height: useBreakpointValue({ base: "20%", md: "30%" }),
            //   position: "absolute",
            //   bottom: 1,
            //   left: 0,
            //   bg: "blue.400",
            //   zIndex: -1,
            // }}
            >
              Cubicle
            </Text>
            <br />
            {/* <Text color={"blue.400"} as={"span"}>Transforming Recruitment</Text> */}
          </Heading>

          {/* Image for Mobile */}
          {isMobile && (
            <Flex flex={1} align={"center"} justifyContent={"center"} mt={5} position={"relative"}>
              <AnimatedBox imageSize={imageSize}>
                <AspectRatio ratio={3 / 1.9} >
                  <Image src={dimg} alt="Campus to Cubicle" objectFit="cover" />
                </AspectRatio>
              </AnimatedBox>
            </Flex>
          )}

          <MotionText fontSize={textSize} color={"#000000"}>
            TalentConnect ensures that fresh graduates step confidently into their new roles. We offer skill-boosting training and onboarding programs to empower candidates for immediate impact in the workforce. By taking full ownership of the recruitment process, we provide companies with prepared, adaptable talent, creating a seamless transition from academic life to professional excellence.
          </MotionText>

          <Stack direction={{ base: "column", md: "row" }} spacing={4} justify={{ md: "center", xl: "flex-start" }}>
            <Button
              as={RouterLink}
              to="/campus-to-cubicle"
              rounded={"full"}
              color={"white"}
              fontSize={buttonSizes}
              px={paddingX}
              py={paddingY}
              bgColor={"teal.500"}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                bg: "blue.300",
                color: "white",
                transition: "all 0.2s ease-in-out",
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
