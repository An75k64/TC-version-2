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
  Tag
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";

const Referrals = () => {
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
    <Box
      p={{ base: 4, md: 2, lg: 8 }}
      mx="auto"
      maxW={{ base: "100%", md: "100%", lg: "80%" }}
      bg={useColorModeValue("gray.50", "gray.800")}
      borderRadius="lg"
      boxShadow="2xl"
    >
      <Heading
        as="h2"
        size={{ base: "lg", lg: "xl" }}
        textAlign="center"
        mb={{ base: 6, md: 10 }}
        color={useColorModeValue("blue.500", "blue.300")}
      >
        Referrals Overview
      </Heading>

      {/* Job List */}
      {jobs.map((job) => (
        <Box
          key={job.jobId}
          mb={{ base: 6, md: 8, lg: 12 }}
          p={{ base: 4, lg: 6 }}
          bg={useColorModeValue("white", "gray.700")}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }}
            justify="space-between"
            mb={4}
          >
            <Heading
              as="h3"
              size={{ base: "md", lg: "lg" }}
              color={useColorModeValue("blue.600", "blue.400")}
              mb={{ base: 2, md: 0 }}
              textAlign={{ base: "left", lg: "center" }}
            >
              {job.title}
            </Heading>
            <Tag
              size={{ base: "md", lg: "lg" }}
              colorScheme="blue"
              borderRadius="full"
              py={{ base: 1, lg: 2 }}
              px={{ base: 3, lg: 4 }}
            >
              {job.referrals.length} Referrals
            </Tag>
          </Flex>

          {/* Referrals Table */}
          <Table variant="simple" size={{ base: "sm", lg: "md" }}>
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
                    <Stack direction="row" align="center" spacing={4}>
                      <Avatar size="sm" icon={<FiUser />} />
                      <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                        {referral.name}
                      </Text>
                    </Stack>
                  </Td>
                  <Td fontSize={{ base: "sm", lg: "md" }}>{referral.email}</Td>
                  <Td>
                    <Badge
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontSize={{ base: "xs", lg: "0.9em" }}
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
