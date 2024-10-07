import React from 'react';
import { Box, Flex,Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CollegeCTA = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens, horizontally on larger screens
      align="center"
      justify="space-between"
      p={8}
      bg="blue.50"
    >
      <Box flex={1} textAlign={{ base: 'center', md: 'left' }} mb={{ base: 6, md: 0 }}>
        <Flex >
                <Heading
                  fontFamily="ClashDisplay"
                  fontSize={{ base: "xl", md: "2xl", lg: "5xl" }} // Responsive font size
                  fontWeight="bold"
                  p="2"
                >
                  <Text as="span" color="black">
                    Empower Your
                  </Text>
                  <Text as="span" color="blue.400">
                    {' '}Company Today
                  </Text>
                </Heading>
              </Flex>
        <Text fontSize={"20px"} color="gray.600">
          Join TalentConnect and Revolutionize your Hiring Process.
        </Text>
      </Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify={{ base: 'center', md: 'flex-start' }}
      >
         <Link to="/company-form">
        <Button
          colorScheme="teal"
          size="lg"
          mb={{ base: 4, md: 0 }}
          mr={{ base: 0, md: 4 }}  // Add margin-right on medium screens and larger
          onClick={() => console.log('Get Started clicked')}
          _hover={{
              bgGradient: 'linear(to-r, #0ea5e9, #2563eb)',
              transform: 'scale(1.05)',
              textDecoration: 'none', // Ensure no underline on hover
              color:"white"
            }}
        >
          Get Started
        </Button>
        </Link>

        <Link to="/contact">
        <Button
          variant="outline"
          colorScheme="blue"
          size="lg"
          ml={{ base: 0, md: 4 }}  // Add margin-left on medium screens and larger
          onClick={() => console.log('Contact Us clicked')}
          _hover={{
              bgGradient: 'linear(to-r, #0ea5e9, #2563eb)',
              transform: 'scale(1.05)',
              textDecoration: 'none', // Ensure no underline on hover
              color:"white"
            }}
        >
          Contact Us
        </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CollegeCTA;
