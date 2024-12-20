import React from "react";
import { Container, Stack, Heading,Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";

const Section3 = () => {
  const cardData = [
    {
      title: "Partnerships",
      imageUrl:
        "https://d3g8ff7g609hps.cloudfront.net/assets/Services/Oncampus/Partener.webp",
      description:
        "At TalentConnect, we offer seamless on-campus hiring solutions in partnership with universities and colleges, providing comprehensive end-to-end recruitment services. Our tailored approach ensures efficient hiring processes, connecting students directly with top employers. Let us enhance your campus recruitment with our expertise and extensive network.",
    },
    {
      title: "Talent Pipeline",
      imageUrl:
        "https://d3g8ff7g609hps.cloudfront.net/assets/Services/Oncampus/Pipeline.webp",
      description:
        "At TalentConnect, we provide access to a steady pipeline of pre-screened candidates, ensuring you have a continuous supply of qualified talent. Our rigorous screening process guarantees that only the best candidates are presented, streamlining your hiring process. Rely on our expertise to maintain a robust talent pipeline for your organization's needs.",
    },
    {
      title: "Campus Branding",
      imageUrl:
        "https://d3g8ff7g609hps.cloudfront.net/assets/Services/Oncampus/campus.webp",
      description:
        "At TalentConnect, we develop detailed strategies to create a strong brand presence on campus, enhancing your visibility and reputation. Our expertise includes showcasing successful campus branding campaigns that have effectively engaged students. Let us help you build a compelling and memorable brand presence within academic communities.",
    },
  ];

  return (
    <Container maxW="100%" bgColor="#FCEEE3" minH={"80vh"}>
     <Flex justifyContent="center" alignItems="center">
      <Heading
        fontFamily={"ClashDisplay"}
        fontSize={useBreakpointValue({ base: "2xl", sm: "3xl", "2xl": "5xl", "3xl": "7xl" })}
        fontWeight="bold"
        color="#1E3A8A"
        textAlign="center"
        mb={10}
        mt={10}
        p={2}
      >
        <br />
        Our Unique 
      </Heading>
       <Heading
        fontFamily={"ClashDisplay"}
        fontSize={useBreakpointValue({ base: "2xl", sm: "3xl", "2xl": "5xl", "3xl": "7xl" })}  
        fontWeight="bold"
         color="#FFA500"
        textAlign="center"
        mb={10}
        mt={10}
      >
        <br />
        Offerings
      </Heading>
      <br />
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
              <Heading fontFamily={"ClashDisplay"} textTransform={"uppercase"} color="blue.400" as="h3" size={useBreakpointValue({base:"md", "2xl": "lg", "3xl": "3xl"})} mb={useBreakpointValue({base: 4, md: 0, lg: -4, xl: 4})}>
                {card.title} <br /> <br />
              </Heading>
              <Text text-align= {"justify"} fontSize={useBreakpointValue({base: "xs", md: "sm", lg: "xs", xl: "md", "3xl": "4xl"})}>{card.description}</Text>
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
