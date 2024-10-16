import React from 'react';
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
            <Text  fontSize="lg" fontWeight="bold">{title}</Text>            
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
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={12}>
      <Flex direction="column" align="center" maxW="7xl" mx="auto" px={4}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
          <DashboardCard
            title="Job Postings"
            icon={FaBriefcase}
            value="24"
            subheading="Manage your job opportunities"
            actionText="Post New Job"
            actionLink="/affiliate-dashboard/postjob"
            viewAllText="View All"
            viewAllLink="/affiliate-dashboard/postjob"
          />
          <DashboardCard
            title="Referrals"
            icon={FaUserFriends}
            value="87"
            subheading="Track your student referrals"
            actionText="Manage Referrals"
            actionLink="/affiliate-dashboard/referrals"
            viewAllText="View All"
            viewAllLink="/affiliate-dashboard/referrals"
          />
        {/* <DashboardCard
            title="Earnings"
            icon={FaMoneyBillWave}
            value="₹1,245"
            subheading="View your total rewards"
           // actionText="Request Payout"
           // actionLink="/request-payout"
            viewAllLink="/earnings-details"
          />  */} 
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default DashboardAffiliate;
