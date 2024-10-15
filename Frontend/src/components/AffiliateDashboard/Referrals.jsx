import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Stack,
  Avatar,
  useColorModeValue,
  Icon,
  Button,
  Spacer,
  Tag
} from "@chakra-ui/react";
import { FiUser, FiCheckCircle } from "react-icons/fi";

const Referrals = () => {
  // Mock data for jobs and referrals
  const [jobs, setJobs] = useState([
    {
      jobId: 1,
      title: "Software Engineer",
      referrals: [
        { name: "John Doe", status: "Interview", email: "john@example.com" },
        { name: "Jane Smith", status: "Offer Letter", email: "jane@example.com" },
      ],
    },
    {
      jobId: 2,
      title: "Frontend Developer",
      referrals: [
        { name: "Alice Johnson", status: "HR", email: "alice@example.com" },
        { name: "Bob Brown", status: "Interview", email: "bob@example.com" },
      ],
    },
  ]);

  const statusColorScheme = {
    "Offer Letter": "green",
    HR: "orange",
    Interview: "blue",
  };

  return (
    <Box p={8} mx="auto" maxW="1200px" bg={useColorModeValue("gray.50", "gray.800")} borderRadius="lg" boxShadow="2xl">
      <Heading as="h2" size="xl" textAlign="center" mb={10} color={useColorModeValue("blue.500", "blue.300")}>
        Referrals Overview
      </Heading>

      {/* Job List */}
      {jobs.map((job) => (
        <Box key={job.jobId} mb={12} p={6} bg={useColorModeValue("white", "gray.700")} borderRadius="lg" boxShadow="lg">
          <Flex align="center" justify="space-between" mb={4}>
            <Heading as="h3" size="lg" color={useColorModeValue("blue.600", "blue.400")}>
              {job.title}
            </Heading>
            <Tag size="lg" colorScheme="blue" borderRadius="full" py={1} px={4}>
              {job.referrals.length} Referrals
            </Tag>
          </Flex>

          {/* Referrals Table */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Candidate</Th>
                <Th>Email</Th>
                <Th>Status</Th>
               
              </Tr>
            </Thead>
            <Tbody>
              {job.referrals.map((referral, index) => (
                <Tr key={index}>
                  <Td>
                    <Stack direction="row" align="center">
                      <Avatar size="sm" icon={<FiUser />} />
                      <Text fontWeight="bold">{referral.name}</Text>
                    </Stack>
                  </Td>
                  <Td>{referral.email}</Td>
                  <Td>
                    <Badge
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontSize="0.9em"
                      colorScheme={statusColorScheme[referral.status]}
                    >
                      {referral.status}
                    </Badge>
                  </Td>
                 
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default Referrals;
