import React from 'react';
import { Box, Flex, Heading, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import Marquee from 'react-marquee-slider';

// Import logos from assets
// import arunEngLogo from '../../assets/images/company logo/arun.png';
// import arkaJainLogo from '../../assets/images/company logo/jgi.jpg';
// import jharkhandITLogo from '../../assets/images/company logo/jis.png';
// import hp from '../../assets/images/company logo/hp.jpg';
// import h from '../../assets/images/company logo/hitachi.jpeg';
// import emv from '../../assets/images/company logo/emversity.jpg';
// import winso from '../../assets/images/company logo/winso.png';
// import cms from '../../assets/images/company logo/cmss.jpg';
// import blue from '../../assets/images/company logo/bluecraft.jpg';
// import ak from '../../assets/images/company logo/ak.jpg';
// import jin from '../../assets/images/company logo/jindal.jpg';

// List of companies with logos
const companiesList = [
  { name: "ARUN ENG & CO", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/arun.webp" },
   { name: "Hitachi Chennai", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/hitachi.webp" },
  { name: "Arka Jain", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/jgi.webp" },
  { name: "JINDAL ORRISA", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/jindal.webp" },
  { name: "Hitachi Mumbai", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/hitachi.webp" },
  { name: "Jharkhand IT Solutions", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/jis.webp" },
  { name: "Hitachi Payment Services", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/hp.webp" }, 
  { name: "Emversity", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/emversity.webp" },
  { name: "Blue Craft", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/bluecraft.webp" },
  { name: "Hitachi North East", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/hitachi.webp" },
  { name: "Winso Software Pvt Ltd", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/winso.webp" },
  { name: "Hitachi Jaipur", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/hitachi.webp" },
  { name: "CMS", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/cmss.webp" }, 
  { name: "A.K ENGINEERING CORPORATION", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/ak.webp" },
  { name: "Hitachi Assam", logo: "https://d3g8ff7g609hps.cloudfront.net/assets/Home/company%20logo/hitachi.webp" },  
  { name: "M/s Unique Engineer's" }, // No logo for this company  

  
];

const Companies = () => {
  const headingFontSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "5xl" , xl: "5xl", "2xl": "6xl", "3xl": "8xl"  });
  const textFontSize = useBreakpointValue({ base: "md", sm: "md", md: "md", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "5xl" });
  const pscreenY = useBreakpointValue({ base: 5, sm: 10, md: 10, lg: 10, xl: 12, "2xl": 14, "3xl": 40 });

  return (
    <Box textAlign="center" py={pscreenY} bgColor={"white"}>
      <Flex justifyContent="center" alignItems="center" direction={{ base: "column", xl: "row" }}>
        <Heading as="h4" size="xl" p={{ base: "2", lg: "4", "3xl": "8" }}
          fontSize={headingFontSize}
          fontFamily={"ClashDisplay"}
          color={"black"}
        >
          Top Startups & MNC’s
        </Heading>
        <Heading as="h4" size="xl"
          fontSize={headingFontSize}
          fontFamily={"ClashDisplay"}
          color={"blue.400"}
        >
          that Hire from TalentConnect
        </Heading>
      </Flex>
      <Box overflow="hidden" width="100%" mt={{ base: "10", lg: "20" }}>
        <Marquee>
           {companiesList.map((company, index) => (
            <Box key={index} mx="6" display="inline-block" p="3">
              <Flex alignItems="center" justifyContent="center">
                {company.logo ? (
                  <Image src={company.logo} alt={`${company.name || 'Company'} logo`} boxSize="50px" mr="3"/>  // Display logo if exists
                ) : (
                  <Box boxSize="50px" />  // Empty box to maintain spacing for no logo
                )}
                <Text
                  fontSize={textFontSize}
                  fontWeight="bolder"
                  color="orange.400"  // Professional color for company name
                  fontFamily={"Poppins, sans-serif"}
                  textAlign="center"
                >
                  {company.name}
                </Text>
              </Flex>
              </Box>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default Companies;
