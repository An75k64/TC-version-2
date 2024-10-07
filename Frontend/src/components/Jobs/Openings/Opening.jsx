import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Input, Button, Flex, useBreakpointValue, Stack, Text, List, ListItem } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import Card from '../Card/Card.jsx';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

function Opening() {
    const [cards, setCards] = useState([]);
    const [titleQuery, setTitleQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;

    useEffect(() => {
        axios.get(`${apiUrl}/api/cards/cards`)
            .then(response => {
                setCards(response.data);
                setFilteredCards(response.data); // Initially display all cards
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    // Handle search filter for jobs
    const handleSearch = () => {
        const filtered = cards.filter(card =>
            card.title.toLowerCase().includes(titleQuery.toLowerCase()) &&
            card.location.toLowerCase().includes(locationQuery.toLowerCase())
        );
        setFilteredCards(filtered);
        setCurrentPage(1); // Reset to the first page when search is performed
    };

    // Handle page change for pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Fetch location suggestions
    const fetchLocationSuggestions = (query) => {
        if (query.length >= 1) { // Fetch suggestions if input is at least 2 characters
            // You can replace this with an API call to fetch real location data
            axios.get(`${apiUrl}/api/cards/locations?query=${query}`)
                .then(response => {
                    setLocationSuggestions(response.data); // Assume API returns location suggestions
                })
                .catch(error => {
                    console.error('Error fetching location suggestions:', error);
                });
        } else {
            setLocationSuggestions([]); // Clear suggestions if query is too short
        }
    };

    // Handle location input changes
    const handleLocationChange = (event) => {
        setLocationQuery(event.target.value);
        fetchLocationSuggestions(event.target.value);
    };

    // Handle selecting a location from suggestions
    const handleSuggestionClick = (suggestion) => {
        setLocationQuery(suggestion);
        setLocationSuggestions([]); // Clear suggestions after selection
    };

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = filteredCards.slice(startIndex, startIndex + cardsPerPage);

    const headingFontSize = useBreakpointValue({ base: '2xl', md: '6xl' });
    const searchInputWidth = useBreakpointValue({ base: 'full', md: '400px' });
    const searchButtonWidth = useBreakpointValue({ base: 'full', md: '200px' });

    return (
        <Box id="current-opening" p={4} mt={120}>
            <Box mb={8} textAlign="center">
                <Heading
                    as="h1"
                    fontSize={headingFontSize}
                    fontWeight="bold"
                    textAlign="center"
                    color="blue.400"
                    fontFamily={"ClashDisplay"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
                >
                    Current Openings
                </Heading>
            </Box>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align="center"
                justify="center"
                gap={4}
                mb={8}
            >
                <FaSearch fontSize="25px" />
                <Input
                    placeholder="Search job name"
                    value={titleQuery}
                    onChange={event => setTitleQuery(event.target.value)}
                    width={searchInputWidth}
                    borderRadius="20px"
                    bg="aliceblue"
                    color="black"
                />
                <FaLocationDot fontSize="25px" />
                <Box position="relative" width={searchInputWidth}>
                    <Input
                        placeholder="Location"
                        value={locationQuery}
                        onChange={handleLocationChange}
                        width="100%"
                        borderRadius="20px"
                        bg="aliceblue"
                        color="black"
                    />
                    {locationSuggestions.length > 0 && (
                        <List
                            bg="white"
                            border="1px solid lightgray"
                            borderRadius="10px"
                            mt={2}
                            position="absolute"
                            zIndex={10}
                            width="100%"
                            maxHeight="150px"
                            overflowY="auto"
                        >
                            {locationSuggestions.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    p={2}
                                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
                <Button
                    onClick={handleSearch}
                    bg="rgb(226, 55, 112)"
                    color="white"
                    borderRadius="20px"
                    width={searchButtonWidth}
                    fontWeight="600"
                    _hover={{ bg: "blue.300", color: "white", transform: "scale(1.05)" }}
                >
                    Search
                </Button>
            </Flex>
           
            <Flex wrap="wrap" gap={6} justify="center">
                {currentCards.map(card => (
                    <Card
                        key={card.jobId}
                        title={card.title}
                        location={card.location}
                        salary={card.salary}
                        experience={card.experience}
                        jobDescription={card.jobDescription}
                        jobId={card.jobId}
                        department={card.department}
                        roleCategory={card.roleCategory}
                        employmentType={card.employmentType}
                        eductaion={card.eductaion}
                        englishLevel={card.englishLevel}
                        gender={card.gender}
                    />
                ))}
            </Flex>
            <Stack spacing={4} align="center" mt={8}>
                <Flex gap={2}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            variant={currentPage === index + 1 ? 'solid' : 'outline'}
                            colorScheme="blue"
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Flex>
            </Stack>
        </Box>
    );
}

export default Opening;
