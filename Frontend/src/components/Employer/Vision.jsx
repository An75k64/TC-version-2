import React from 'react';
import { Flex, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue, Box } from "@chakra-ui/react";

export default function CollegeIntro() {

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} mt={10}>
      {/* Container for Image and Background Dots */}
      <Flex flex={1} align={"center"} justify={"center"} position="relative">
        {/* Dots Background Box */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"  // Make this box larger
          height="100%"
          zIndex={-1}
          bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)',
              )}
          backgroundSize="20px 20px"
          backgroundRepeat="repeat"
          opacity="0.4"
        />
        {/* Image Box */}
        <Box
          position="relative"
          overflow="hidden"
          width="80%"
          maxHeight="60vh"
          borderRadius="lg"
        >
          <Box
            position="relative"
            overflow="hidden"
            transition="transform 0.5s ease"
            _hover={{ transform: "scale(1.1)" }}
          >
            <Image
              alt={"College Recruitment"}
              objectFit={"cover"}
              borderRadius='10px'
              height="100%"
              src={
                "https://d3g8ff7g609hps.cloudfront.net/assets/Employer/partner.webp"
              }
            />
          </Box>
        </Box>
      </Flex>

      {/* Main Content Section */}
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              fontSize={"28px"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "15%" }),
                position: "absolute",
                bottom: -1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              A Partnership Built on Trust:
            </Text>
            <br />
            <Text color={"grey.100"} as={"span"}>
            Why Partner with <Text color={'blue.400'}>TalentConnect </Text>
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"black"}>
          At TalentConnect, we bridge the gap between businesses and the next generation of top-tier talent. Our platform connects employers with a dynamic pool of skilled graduates, bringing fresh ideas, technical expertise, and a passion for innovation to your organization. Whether you're looking for bright minds in tech, creative problem-solvers, or leaders of tomorrow, TalentConnect is your gateway to a diverse and capable talent pool.
          </Text>
          <hr />
        </Stack>
      </Flex>
    </Stack>
  );
}
