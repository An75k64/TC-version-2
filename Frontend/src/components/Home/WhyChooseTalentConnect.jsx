import { ReactElement, useState } from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex, keyframes, useBreakpointValue } from "@chakra-ui/react";
import { FcReadingEbook, FcIdea, FcGraduationCap } from "react-icons/fc";
import { Link } from "react-router-dom";

// Keyframes for rotating and changing color
const rotate = keyframes`
  // 0% { transform: rotate(0deg); border-color: #63b3ed; }
  25% { border-color: #f56565; }
  50% { border-color: #48bb78; }
  75% { border-color: #d69e2e; }
  // 100% { transform: rotate(360deg); border-color: #63b3ed; }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: scale(0.8); } 
  50% { transform: scale(1); }
`;

// Array of colors excluding yellow
const colors = ["green.400", "red.400", "purple.400", "white", "orange.400", "pink.400"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Feature = ({ title, text, icon, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const randomBgColor = getRandomColor(); // Generate random color for icon background

  const headingSize = useBreakpointValue({ base: "md", sm: "lg", md: "lg", lg: "xl", xl: "xl", "2xl": "2xl", "3xl": "5xl" });
  const textSize = useBreakpointValue({ base: "sm", sm: "sm", md: "sm", lg: "lg", xl: "lg", "2xl": "xl", "3xl": "4xl" });

  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Stack
        align="center"
        bg="#95D6D0"
        boxShadow="md"
        borderRadius="xl"
        p={6}
        w="100%"
        h="100%"
        border="2px solid white"
        transition="transform 0.3s ease-in-out, box-shadow 0.3s"
        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        position="relative"
      >
        <Flex
          w={20} h={20}
          align="center" justify="center"
          position="absolute"
          top="-10"
          borderRadius="full"
          borderWidth="4px"
          borderColor={isHovered ? "blue.400" : "transparent"}
          animation={isHovered ? `${rotate} 4s infinite linear` : "none"} // Rotating effect
        >
          <Flex
            w={16} h={16}
            align="center" justify="center"
            color={"white"}
            rounded={"full"}
            bg={randomBgColor} // Use random background color
            transform={isHovered ? "scale(1.10)" : "scale(1)"}
            transition="transform 0.5s ease-in-out"
            >
            <Flex
            animation={isHovered ? `${bounceAnimation} 3s infinite` : "none"}
            
            >

            {icon}
            </Flex>
          </Flex>
        </Flex>
        <Text fontWeight={700} textAlign="center" fontSize={headingSize} mt={12} mb={8}>
          {title}
        </Text>
        <Text color={"white"} textAlign="center" fontWeight={400} fontSize={textSize}>
          {text}
        </Text>
      </Stack>
    </Link>
  );
};

export default function WhyChooseTalentConnect() {
  const headingFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "5xl", "2xl": "6xl", "3xl": "8xl" });
  const textFontSize = useBreakpointValue({ base: "sm", sm: "md", md: "md", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "5xl" });
  const pScreenX = useBreakpointValue({ base: 3, sm: 4, md: 4, lg: 12, xl: 6, "2xl": 7, "3xl": 14 });
  const pscreenY = useBreakpointValue({ base: 10, sm: 10, md: 12, lg: 12, xl: 12, "2xl": 14, "3xl": 40 });

  return (
    <Box p={pscreenY} bg="#95D6D0" px={pScreenX}>
      <Flex justifyContent="center" alignItems="center" direction={{ base: "column", lg: "row" }}>
        <Text
          fontSize={headingFontSize}
          fontWeight={700}
          mb={{ lg: "6" }}
          color="black"
        >
          Why Choose
        </Text>
        <Text
          fontSize={headingFontSize}
          fontWeight={700}
          mb={6}
          color="white"
          ml={{ base: "2", "3xl": "8" }}
        >
          TalentConnect?
        </Text>
      </Flex>
      <Text
        fontSize={textFontSize}
        color={"black"}
        mb={10}
        textAlign="center"
      >
        We offer seamless campus-to-cubicle programs, innovative recruitment solutions, and personalized career services
        to meet your unique needs.
      </Text>
      <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={{base:12, xl:8}}>
        <Feature
          icon={<Icon as={FcReadingEbook} w={10} h={10}  />}
          title={"Seamless Campus-to-Cubicle Programs"}
          text={"Transition smoothly from academia to the professional world."}
          link="/campus-to-cubicle"
        />
        <Feature
          icon={<Icon as={FcIdea} w={10} h={10} />}
          title={"Innovative Recruitment Solutions"}
          text={"Revolutionizing the way talent meets opportunity."}
          link="/employer"
        />
        <Feature
          icon={<Icon as={FcGraduationCap} w={10} h={10} />}
          title={"Personalized Career Services"}
          text={"Tailored to your individual goals and aspirations."}
          link="/services/careercraft"
        />
      </SimpleGrid>
    </Box>
  );
}
