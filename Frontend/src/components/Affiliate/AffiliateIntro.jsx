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
      h={useBreakpointValue({base:"250vh", lg:"100vh"})}
      position="relative"
      overflow="hidden"
      zIndex={2}
      mt={useBreakpointValue({base:'-10', xl: '-25vh' })}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h={useBreakpointValue({base:'100%', lg:'100%'})}
        bgImage="url('https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/newAffiliate/why.webp')"
        bgSize={useBreakpointValue({ base: 'contain', xl: 'cover' })}
        bgRepeat="no-repeat"
        //bgPosition="center"
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
        p={useBreakpointValue({ base: 5, md: 10 })}
        zIndex={2}
        position="relative"
        mt={useBreakpointValue({ '2xl': '-20', '3xl': '-40' })}
      >
        <Box textAlign="center" maxW={{ base: '90%', lg: '70%', '3xl': '90%' }} mx="auto">
          <Heading
            fontSize={useBreakpointValue({
              base: '3xl',
              md: '4xl',
              lg: '5xl',
              xl: '6xl',
              '3xl': '7xl',
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
            mt={useBreakpointValue({ base: '4', '2xl': '8', '3xl': '10' })}
            fontSize={useBreakpointValue({ base: 'md', lg: 'lg', '3xl': '5xl' })}
            color="black"
            fontWeight="medium"
            textAlign="center"
          >
            Leverage your network, access exclusive tools, and earn rewards by connecting top-tier talent with the right opportunities.
          </Text>
        </Box>

        {/* Cards Section */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: '1fr',
            md: '1fr',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(4,1fr)',
          }}
          gap={6}
          mt={useBreakpointValue({ base: '10', '2xl': '20', '3xl': '40' })}
          w="full"
          maxW="90%"
          px={useBreakpointValue({ base: 4, lg: 8 })}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              position="relative"
              borderWidth="2px"
              borderColor="white"
              borderRadius="lg"
              p={useBreakpointValue({ base: 4, lg: 6 })}
              pt={14}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              h={useBreakpointValue({ base: 'auto', '3xl': '15vh' })}
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
                fontSize={useBreakpointValue({ base: 'lg', lg: 'xl' })}
                color="black"
                mb={2}
              >
                {card.heading}
              </Heading>
              <Text
                fontSize={useBreakpointValue({ base: 'sm', lg: 'md' })}
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