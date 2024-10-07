import React from 'react';
import { Box, Image, Text, Button, Flex, VStack, useTheme, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';
import { FaWhatsapp, FaRupeeSign } from 'react-icons/fa';
import { PiBagFill } from 'react-icons/pi';
import OpeningForm from '../Openings/Openingform';

function Card({ jobId, title, location, salary, experience, jobDescription }) {
    const theme = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const colorShades = [
        theme.colors.blue[100],
        theme.colors.orange[100],
        theme.colors.red[200],
        theme.colors.green[100],
        theme.colors.yellow[100],
        theme.colors.pink[100],
    ];

    // Function to get a random shade
    const getRandomShade = () => {
        const randomIndex = Math.floor(Math.random() * colorShades.length);
        return colorShades[randomIndex];
    };

    const hoverShade = getRandomShade();

    return (
        <Box
            position="relative"
            height="355px"
            width="290px"
            padding="5px"
            borderRadius="15px"
            border="1px"
            //boxShadow="5px 5px 5px rgb(49, 49, 49)"
            overflow="hidden"
            bg="white"
            _hover={{
                borderColor: hoverShade,
                boxShadow: '2xl',
                bgGradient: `linear(to-r, white, ${hoverShade})`
            }}
            transition="all 0.3s ease"
        >
            <Flex
                direction="column"
                align="center"
                padding="8px 0 5px"
            >
                <Image
                    src='https://i.postimg.cc/P5Bwd7d1/logo-01.png'
                    alt="Company Logo"
                    borderRadius="full"
                    boxSize="40px"
                />
            </Flex>
            <VStack
                spacing="12px"
                padding="20px"
                align="start"
            >
                <Text
                    fontSize="18px"
                    textAlign="center"
                    fontWeight={700}
                >
                    {title}
                </Text>
                <Flex align="center">
                    <FaLocationDot fontSize="15px" />
                    <Text paddingLeft="5px">{location}</Text>
                </Flex>
                <Flex align="center">
                    <FaRupeeSign fontSize="15px" />
                    <Text paddingLeft="5px">{salary}</Text>
                </Flex>
                <Flex align="center">
                    <PiBagFill fontSize="15px" />
                    <Text paddingLeft="5px">{experience}</Text>
                </Flex>
            </VStack>

            {/* Fixed Buttons at the Bottom */}
            <Flex
                direction="row"
                justify="center"
                align="center"
                gap="20px"
                padding="10px 0"
                position="absolute"
                bottom="10px"   // Fixed at the bottom
                width="100%"
            >
                <Button
                    bgGradient="linear(to-r, blue.600, skyblue)" 
                    variant="solid"
                    borderRadius="15px"
                    color="white"
                    fontWeight="600"
                    onClick={onOpen}
                    _hover={{transform: "scale(1.05)", bgGradient: "linear(to-r, blue, blue.600)" }}
                >
                    Apply Now
                </Button>
                <a href='https://wa.me/7979863193'>
                    <Button
                        bgGradient="linear(to-r, teal, green.300)" // Different color for Chat Now
                        variant="solid"
                        borderRadius="15px"
                        color="white"
                        fontWeight="600"
                        leftIcon={<FaWhatsapp />}
                        _hover={{transform: "scale(1.05)", bgGradient: "linear(to-r, limegreen, teal)"}}
                    >
                        Chat Now
                    </Button>
                </a>
            </Flex>

            {/* Modal for OpeningForm */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay bg="blackAlpha.600" />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <OpeningForm jobId={jobId} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Card;
