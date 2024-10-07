import React from 'react';
import { Box, Flex, Heading, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import Marquee from 'react-marquee-slider';

// Import logos from assets
import arunEngLogo from '../../assets/images/company logo/arun.png';
import arkaJainLogo from '../../assets/images/company logo/jgi.jpg';
import jharkhandITLogo from '../../assets/images/company logo/jis.png';
import hp from '../../assets/images/company logo/hp.jpg';
import h from '../../assets/images/company logo/hitachi.jpeg';
import emv from '../../assets/images/company logo/emversity.jpg';
import winso from '../../assets/images/company logo/winso.png';
import cms from '../../assets/images/company logo/cmss.jpg';
import blue from '../../assets/images/company logo/bluecraft.jpg';
import ak from '../../assets/images/company logo/ak.jpg';
import jin from '../../assets/images/company logo/jindal.jpg';

// List of companies with logos
const companiesList = [
  { name: "ARUN ENG & CO", logo: arunEngLogo },
   { name: "Hitachi Chennai", logo: h },
  { name: "Arka Jain", logo: arkaJainLogo },
  { name: "JINDAL ORRISA", logo: jin },
  { name: "Hitachi Mumbai", logo: h },
  { name: "Jharkhand IT Solutions", logo: jharkhandITLogo },
  { name: "Hitachi Payment Services", logo: hp }, 
  { name: "Emversity", logo: emv },
  { name: "Blue Craft", logo: blue },
  { name: "Hitachi North East", logo: h },
  { name: "Winso Software Pvt Ltd", logo: winso },
  { name: "Hitachi Jaipur", logo: h },
  { name: "CMS", logo: cms }, 
  { name: "A.K ENGINEERING CORPORATION", logo: ak },
  { name: "Hitachi Assam", logo: h },  
  { name: "M/s Unique Engineer's" }, // No logo for this company  

  
];

const Companies = () => {
  const headingFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "4xl", "2xl": "6xl", "3xl": "8xl" });
  const textFontSize = useBreakpointValue({ base: "10px", sm: "11px", md: "sm", lg: "md", xl: "sm", "2xl": "2xl", "3xl": "2xl" });
  const pscreenY = useBreakpointValue({ base: 5, sm: 10, md: 10, lg: 10, xl: 12, "2xl": 14, "3xl": 40 });

  return (
    <Box textAlign="center" py={pscreenY}>
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
