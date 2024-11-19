import React from 'react';
import { Box, Heading, Text, Image, useBreakpointValue } from '@chakra-ui/react';

const AffiliateIntro = () => {
  const cards = [
    {
      icon: 'https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/sign.webp',
      heading: 'Sign Up',
      subtext: 'Join TalentConnect’s Affiliate Program by completing the registration.',
    },
    {
      icon: 'https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/ref.webp',
      heading: 'Start Referring',
      subtext: 'Refer candidates to start earning rewards for successful placements.',
    },
    {
      icon: 'https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/er.webp',
      heading: 'Earn Commission',
      subtext: 'Get up to 20% commission on each successful placement you facilitate.',
    },
    {
      icon: 'https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/tr.webp',
      heading: 'Track Progress',
      subtext: 'Track your referrals and commissions in your personal dashboard.',
    },
  ];

  return (
    <Box
      as="section"
      w="full"
      h={useBreakpointValue({base:"280vh", lg:"120vh", xl:"100vh"})}
      position="relative"
      overflow="hidden"
      zIndex={2}
      mt={{ base: '-10vh', lg: '-20vh', xl:"-25vh" }}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bgImage="url('https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/why.webp')"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition={useBreakpointValue({base:"center", xl:"undefined"})}
        zIndex={1}
      />

      {/* Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        w="full"
        h="full"
        p={useBreakpointValue({ base: 4, md: 10 })}
        zIndex={2}
        position="relative"
      >
        {/* Title */}
        <Box textAlign="center" maxW="80%" mx="auto">
          <Heading
            fontSize={useBreakpointValue({
               base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "6xl", "2xl": "6xl", "3xl": "9xl"
            })}
            fontWeight="bold"
            color="white"
          >
            <Text as="span" color="black">
              Why Join TalentConnect’s
            </Text>
            <br />
            <Text as="span" color="white">
              Affiliate Program?
            </Text>
          </Heading>
          <Text
            mt={4}
            fontSize={useBreakpointValue({ base: "sm", sm: "sm", md: "sm", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "6xl" })}
            color="black"
            fontWeight="medium"
            textAlign="center"
          >
            Leverage your network, access exclusive tools and earn rewards by connecting top-tier talent with the right opportunities.
          </Text>
        </Box>

        {/* Cards Section */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap={useBreakpointValue({base:"12", md:"12", lg:"12", xl:"6"})}
          mt={useBreakpointValue({base:"20", xl:"10" , "3xl":"40"})}
          w="full"
          maxW="90%"
          px={4}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              position="relative"
              borderWidth="2px"
              borderColor="white"
              borderRadius="lg"
              p={6}
              pt={14}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              zIndex={3}
            >
              <Box
                position="absolute"
                top="-40px"
                left="50%"
                transform="translateX(-50%)"
                bg="white"
                borderRadius="full"
                p={2}
              >
                <Image src={card.icon} alt={card.heading} boxSize="50px" />
              </Box>
              <Heading
                fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })}
                color="black"
                mb={2}
              >
                {card.heading}
              </Heading>
              <Text
                fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
                color="white"
                fontWeight="bold"
              >
                {card.subtext}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AffiliateIntro;
