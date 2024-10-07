import React from "react";
import { Container, Flex, Stack, Heading, Box, Text, useBreakpointValue } from "@chakra-ui/react";

const CollegeSolutions = () => {
  const cardData = [
    {
      title: "Expansive Network",
      imageUrl:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "Connect with numerous top-tier employers seamlessly through our extensive network, bringing a wide range of opportunities directly to you.",
    },
    {
      title: "Comprehensive Training",
      imageUrl:
        "https://images.pexels.com/photos/5904046/pexels-photo-5904046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "Offer targeted training programs to bridge skill gaps and ensure graduates are prepared with industry-specific skills necessary for their careers.",
    },
    {
      title: "Campus Branding",
      imageUrl:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "Develop detailed strategies to create a strong brand presence on campus, enhancing visibility and reputation with successful campaigns.",
    },
  ];

  return (
    <Container maxW={"full"} bg="gray.100" minH={"90vh"} p={{ base: 4, md: 8, lg: 12 }}>
      <Flex justifyContent="center" alignItems="center">
        <Heading
          fontFamily="ClashDisplay"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} // Responsive font size
          fontWeight="bold"
          textAlign="center"
          mb={8}
        >
          <Text as="span" color="black">
            TalentConnect
          </Text>
          <Text as="span" color="blue.400">
            {" "}Solutions for Colleges
          </Text>
        </Heading>
      </Flex>
      <Stack
        direction={useBreakpointValue({ base: "column", md: "row" })}
        justify="space-around"
        spacing={10}
        alignItems="center"
      >
        {cardData.map((card, index) => (
          <Box
            key={index}
            w={{ base: "90%", md: "45%", lg: "30%" }} // Responsive width for small and large screens
            h={{ base: "40vh", md: "50vh" }}
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
                {card.title}
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }}>{card.description}</Text>
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

export default CollegeSolutions;
