import React from "react";
import { Container, Stack, Heading,Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";

const Section3 = () => {
  const cardData = [
    {
      title: "Resume Building",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Services/Seminar/resume.jpeg",
      description:
        "Learn how to optimize your resume to showcase your unique skills, experience, and accomplishments. Our experts will provide personalized feedback to help you stand out to potential employers.",
    },
    {
      title: "Interview Preparation",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Services/Seminar/Interview.jpeg",
      description:
        "Master the art of interviewing through interactive mock sessions and coaching on proven techniques. Gain the confidence to articulate your value and make a lasting impression.",
    },
    {
      title: "Personal Branding",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Services/Seminar/personal-brand.jpeg",
      description:
        "Develop a compelling personal brand that highlights your strengths and differentiates you from the competition. Leverage digital tools and networking strategies to amplify your visibility.",
    },
  ];

  return (
    <Container maxW="100%" minH={"80vh"} pb={10}>
    <Flex justifyContent="center" alignItems="center" mb={10} mt={10}>
        <Heading
          fontFamily="ClashDisplay"
          fontSize={useBreakpointValue({ base: "2xl", sm: "3xl", "2xl": "5xl", "3xl": "7xl" })} 
          fontWeight="bolder"
          textAlign="center"
        >
          <Text as="span" color="#2A4365">
          Empowering
          </Text>
          <Text as="span" color="#FC8E53">
          {" "}Your Career
          </Text>
        </Heading>
      </Flex>
      <Stack
        direction={useBreakpointValue({ base: "column", md: "column", lg: "row" })}
        justify="space-around"
        spacing={10}
      >
        {cardData.map((card, index) => (
          <Box
            key={index}
            //maxW={{ base: "100%", md: "md" }}
            w={"full"}
            h={"50vh"}
            overflow="hidden"
            position="relative"
            borderRadius="xl"
            boxShadow="lg"
            bgSize="cover"
            bgImage={`url(${card.imageUrl})`}
            bgPosition="center"
            _hover={{
              _before: {
                content: `""`,
                position: "absolute",
                left: 0,
                bottom: 0,
                w: "100%",
                h: "100%",
                bg: "rgba(0,0,0,0.5)",
                zIndex: 1,
                transition: "all 0.5s ease",
              },
              "> .content": {
                transform: "translateY(0)",
                opacity: 1,
                transition: "all 0.5s ease",
              },
              "> .titleBox": {
                opacity: 0,
              },
            }}
          >
            <Box
              position="absolute"
              left={0}
              bottom={0}
              w="100%"
              h="100%"
              p={4}
              bg="rgba(0,0,0,0.7)"
              zIndex={2}
              color="white"
              className="content"
              transform="translateY(100%)"
              opacity={0}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Heading fontFamily={"ClashDisplay"} textTransform={"uppercase"} color="blue.400" as="h3" size={useBreakpointValue({base:"md", "2xl": "lg", "3xl": "3xl"})} mb={useBreakpointValue({base: 4, md: 0, lg: -4, xl: -4})}>
                {card.title} <br /> <br />
              </Heading>
              <Text text-align= {"justify"} fontSize={useBreakpointValue({base: "xs", md: "sm", lg: "xs", xl: "md", "2xl": "xl", "3xl": "4xl"})}>{card.description}</Text>
            </Box>
            <Box
              position="relative"
              left={0}
              bottom={0}
              w="100%"
              p={4}
              bg="rgba(0,0,0,0.5)"
              zIndex={3}
              color="white"
              className="titleBox"
              textAlign="center"
              
            >
              <Heading fontFamily={"ClashDisplay"}  as="h3" size={useBreakpointValue({base:"sm", "2xl": "lg", "3xl": "3xl"})}>
                {card.title}
              </Heading>
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Section3;
