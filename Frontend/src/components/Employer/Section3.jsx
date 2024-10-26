
import React from "react";
import { Container, Stack, Flex, Heading, Box, Text, useBreakpointValue } from "@chakra-ui/react";

const Section3 = () => {
  const cardData = [
    {
      title: "Diverse Talent Pool",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Employer/diverse-pool.jpeg",
      description:
        "Access a broad range of qualified candidates.",
    },
    {
      title: "Efficient Hiring:",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Employer/efficient.jpeg",
      description:
        "Leverage technology for quick and effective recruitment.",
    },
    {
      title: "On-Demand Training",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Employer/training.jpeg",
      description:
        "Ensure new hires are job-ready from the start.",
    },
    {
      title: "Employer Branding",
      imageUrl:
        "https://d24xhk2f9wq8ku.cloudfront.net/assets/Employer/branding.jpeg",
      description:
        "Highlight what makes your company a great place to work. Showcase your unique culture, values, and career opportunities to attract top talent and stand out in the job market.",
    },
  ];

  return (
    <Container maxW="100%" bg="gray.100" mt={0} minH={"80vh"}>
      <Flex justifyContent="center" alignItems="center">
        <Heading
          fontFamily="ClashDisplay"
          fontSize={{ base: "xl", md: "2xl", lg: "4xl" }} // Responsive font size
          fontWeight="bold"
          p="2"
          mt={6}
          mb={8}
        >
          <Text as="span" color="black">
            Our Unique
          </Text>
          <Text as="span" color="blue.400">
            {' '}Offerings
          </Text>
        </Heading>
      </Flex>
      <Stack
        direction={useBreakpointValue({ base: "column", md: "row" })}
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
              <Heading fontFamily={"ClashDisplay"} textTransform={"uppercase"} color="blue.400" as="h3" size="md" mb={2}>
                {card.title} <br /> <br />
              </Heading>
              <Text text-align={"justify"}>{card.description}</Text>
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
              <Heading fontFamily={"ClashDisplay"} as="h3" size="md">
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

