import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Link,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaUserFriends, FaBriefcase } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the import path as necessary
import axios from 'axios'; // Import axios for making HTTP requests

// Create a MotionButton component
const MotionButton = motion(Button);

const DashboardCard = ({ title, icon, value, subheading, actionText, actionLink, viewAllText, viewAllLink }) => (
  <Card
    variant="outline"
    borderWidth={1}
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    borderRadius="lg"
    overflow="hidden"
    bg={useColorModeValue('white', 'gray.800')}
    p={5}
    boxShadow="lg"
    transition="transform 0.3s, box-shadow 0.3s"
    _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
  >
    <CardHeader>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          {icon && <Box as={icon} w={10} h={10} color={useColorModeValue('blue.500', 'blue.300')} />}
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
          </Box>
        </Flex>
      </Flex>
      <br />
      <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>{subheading}</Text>
    </CardHeader>
    <CardBody>
      <Flex direction="row" align="center" justify="space-between" mt={2}>
        <Text fontSize="4xl" fontWeight="bold">{value}</Text>
        {actionText && (
          <MotionButton
            as={RouterLink}
            to={actionLink}
            colorScheme="blue"
            size="md"
            bgGradient="linear(to-r, blue.500, pink.500)"
            whileHover={{
              backgroundPosition: '200% center',
              transition: { duration: 0.4 },
            }}
            _hover={{ backgroundPosition: 'right center', transition: 'all 0.4s ease-in-out' }}
            bgSize="200% auto"
          >
            {actionText}
          </MotionButton>
        )}
      </Flex>
    </CardBody>
    <Box mt={4}>
      <Flex justify="space-between" align="center">
        {viewAllText && (
          <Text fontSize="sm" >
            <Link as={RouterLink} to={viewAllLink} color="blue.500">{viewAllText}</Link>
          </Text>
        )}
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          {viewAllText === undefined ? (
            <Link as={RouterLink} to={viewAllLink} color="blue.500">View Details</Link>
          ) : null}
        </Text>
      </Flex>
    </Box>
  </Card>
);

const DashboardAffiliate = () => {
  const { affiliateId } = useContext(AuthContext); // Get affiliateId from AuthContext
  const [jobCount, setJobCount] = useState(0); // State to hold the job count
  const [referralCount, setReferralCount] = useState(0); // State to hold the referral count
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch the job count on component mount
  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/affiliatejob/count/${affiliateId}`); // Fetch job count
        setJobCount(response.data.count); // Set job count from the response
      } catch (error) {
        console.error("Error fetching job count:", error); // Handle errors
      }
    };

    const fetchReferralCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/referredcount/${affiliateId}`); // Fetch referral count
        setReferralCount(response.data.referredCount); // Set referral count from the response
      } catch (error) {
        console.error("Error fetching referral count:", error); // Handle errors
      }
    };

    if (affiliateId) {
      fetchJobCount(); // Only fetch if affiliateId is present
      fetchReferralCount(); // Fetch referral count for the affiliate
    }
  }, [affiliateId]);

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={12}>
      <Flex direction="column" align="center" maxW="7xl" mx="auto" px={4}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
          <DashboardCard
            title="Job Postings"
            icon={FaBriefcase}
            value={jobCount} // Display fetched job count
            subheading="Manage your job opportunities"
            actionText="Post New Job"
            actionLink="/affiliate-dashboard/postjob"
            viewAllText="View All"
            viewAllLink="/affiliate-dashboard/postjob"
          />
          <DashboardCard
            title="Referrals"
            icon={FaUserFriends}
            value={referralCount} // Display fetched referral count
            subheading="Track your student referrals"
            actionText="Manage Referrals"
            actionLink="/affiliate-dashboard/referrals"
            viewAllText="View All"
            viewAllLink="/affiliate-dashboard/referrals"
          />
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default DashboardAffiliate;
