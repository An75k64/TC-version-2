import { useEffect, useRef } from "react";
import { Box, Heading, Text, Button, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HeroPage = () => {
    const paddingX = useBreakpointValue({ base: 4, md: 8, lg: 16, xl: 24 });
    const buttonSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'lg', xl: 'lg' });
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = "https://d3g8ff7g609hps.cloudfront.net/assets2/assets2/Campus/Merged.webm";
        }
    }, []);

    return (
        <Box
            position="relative"
            height="90vh"
            color="white"
            bg={"black"}
            py={{ base: 32, md: 20, lg: 28 }}
            px={paddingX}
        >
            <MotionBox position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0}>
                <video
                    ref={videoRef}
                    muted
                    loop
                    autoPlay
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </MotionBox>

            <VStack spacing={{ base: 6, lg: 8 }} textAlign="center">
                <MotionHeading
                    as="h1"
                    size={useBreakpointValue({ base: "2xl", lg: "3xl" })}
                    bgGradient="linear(to-r, yellow.200, yellow.500)"
                    bgClip="text"
                    fontWeight="bold"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    zIndex={10}
                >
                    CampusToCubicle:
                    <Text color="blue.200">Partnering for Future Success</Text>
                </MotionHeading>
                <MotionText
                    fontSize={{ base: "md", lg: "lg" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    zIndex={10}
                >
                   TalentConnect bridges the campus-to-cubicle gap by aligning company needs with college engagement for efficient recruitment and tailored training for new hires..
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