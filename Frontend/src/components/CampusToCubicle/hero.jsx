import { useEffect, useRef, useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HeroPage = () => {
    const paddingX = useBreakpointValue({ base: 4, md: 8, lg: 16, xl: 24, "2xl": 32 });
    const buttonSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'lg', xl: 'lg' });
    
    const videoRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);  // State to hold the video src

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVideoSrc("https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/Campus/Merged.webm");  // Set the video src when in view
                        observer.unobserve(entry.target);  // Unobserve once loaded
                    }
                });
            },
            { threshold: 0.5 }  // Trigger when 50% of the video is in view
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <Box
            position="relative"
            overflow="hidden"
            height={{ base: "520px", md: "2xl", lg: "3xl", xl:'90vh' }} 
            minHeight="300px"
            py={{ base: 32, md: 20, lg: 28 }}
            px={paddingX}
            color="white"
        >
            {/* Background Video */}
            <MotionBox
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={-1}
                opacity={1}
                transition="opacity 1s ease-in-out"
                ref={videoRef}  // Attach ref to video box
            >
                <video
                    src={videoSrc}  // Lazy-loaded src
                    poster='https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/Campus/poster.webp'
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                  //  poster="https://d24xhk2f9wq8ku.cloudfront.net/assets/Campus/hero-poster.jpg"  // Poster image for perceived speed
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'opacity 2s ease-in-out',
                    }}
                />
            </MotionBox>

            <VStack spacing={{ base: 6, md: 6, lg: 8 }} textAlign="center" zIndex={1}>
                {/* Hero Text with Animation */}
                <MotionHeading
                    as="h1"
                    size={useBreakpointValue({ base: "2xl", md: "2xl", lg: "3xl" })}
                    lineHeight={{ base: "short", lg: "shorter" }}
                    bgGradient="linear(to-r, yellow.200, yellow.500)"
                    bgClip="text"
                    fontWeight="bold"
                    letterSpacing="wide"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    CampusToCubicle:
                    <Text color="blue.200">Partnering for Future Success</Text>
                </MotionHeading>

                <MotionText
                    fontSize={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }}
                    maxW="800px"
                    color="gray.100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    TalentConnect bridges the campus-to-cubicle gap by aligning company needs with college engagement for efficient recruitment and tailored training for new hires.
                </MotionText>

                {/* Call to Action Buttons */}
                <HStack
                    spacing={{ base: 4, md: 8 }}
                    flexDirection={{ base: 'column', md: 'row' }}
                    justifyContent={{ base: 'center', md: 'flex-start' }}
                >
                  <Link to="/contact">
                        <Button
                            colorScheme="transparent"
                            border="2px solid"
                            borderColor={"yellow.300"}
                            _hover={{ backgroundColor: "yellow.300", color: 'black' }}
                            size={buttonSize}
                            rightIcon={<FaArrowRight />}
                            as={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </Box>
    );
};

export default HeroPage;
