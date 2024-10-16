import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Icon,
  Textarea,
  useToast,
  FormErrorMessage,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { FaLaptopCode, FaLightbulb, FaMapMarkerAlt, FaUserTie, FaRupeeSign, FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import axios from 'axios';

// Validation schema using Yup
const validationSchema = Yup.object({
  technology: Yup.string().required('Technology is required'),
  skillset: Yup.string().required('Skillset is required'),
  experience: Yup.string().required('Experience is required'),
  location: Yup.string().required('Location is required'),
  domain: Yup.string().required('Domain is required'),
  salary: Yup.string().required('Salary is required'),
});

const JobPostForm = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const toast = useToast();

  // Fetch posted jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); // Assuming an endpoint exists
        setPostedJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const formik = useFormik({
    initialValues: {
      technology: '',
      skillset: '',
      experience: '',
      location: '',
      domain: '',
      salary: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/jobs', values);
        toast({
          title: "Job Posted",
          description: "Your job posting is live!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        formik.resetForm();
        // Refresh the posted jobs list
        setPostedJobs([...postedJobs, response.data]);
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an issue posting the job.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  // Handle job delete
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      setPostedJobs(postedJobs.filter(job => job._id !== jobId));
      toast({
        title: "Job Deleted",
        description: "The job has been removed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue deleting the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, pink.100, blue.100)"
      py={20}
      minH="100vh"
      textAlign="center"
    >
      <Container maxW="container.md">
        <Heading
          as="h1"
          size="xl"
          mb={8}
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, pink.300)"
          bgClip="text"
        >
          Post a Job
        </Heading>
        <Text fontSize="lg" mb={10} color="gray.600">
          Fill in the details below to share your job opportunity!
        </Text>

        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          shadow="lg"
          borderColor="gray.200"
          borderWidth={1}
        >
          {/* Job Posting Form */}
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={5}>
              {/* Technology */}
              <FormControl isInvalid={formik.touched.technology && formik.errors.technology}>
                <Flex alignItems="center">
                  <Icon as={FaLaptopCode} w={5} h={5} color="blue.500" mr={2} />
                  <FormLabel>Technology</FormLabel>
                </Flex>
                <Textarea
                  name="technology"
                  placeholder="Enter technology stack"
                  value={formik.values.technology}
                  onChange={formik.handleChange}
                  borderRadius="lg"
                  focusBorderColor="blue.400"
                  shadow="sm"
                  rows={3} // For multiline
                />
                <FormErrorMessage>{formik.errors.technology}</FormErrorMessage>
              </FormControl>

              {/* Skillset */}
              <FormControl isInvalid={formik.touched.skillset && formik.errors.skillset}>
                <Flex alignItems="center">
                  <Icon as={FaLightbulb} w={5} h={5} color="pink.500" mr={2} />
                  <FormLabel>Skillset</FormLabel>
                </Flex>
                <Textarea
                  name="skillset"
                  placeholder="Enter required skills"
                  value={formik.values.skillset}
                  onChange={formik.handleChange}
                  borderRadius="lg"
                  focusBorderColor="pink.400"
                  shadow="sm"
                  rows={3} // For multiline
                />
                <FormErrorMessage>{formik.errors.skillset}</FormErrorMessage>
              </FormControl>

              {/* Experience */}
              <FormControl isInvalid={formik.touched.experience && formik.errors.experience}>
                <Flex alignItems="center">
                  <Icon as={FaUserTie} w={5} h={5} color="purple.500" mr={2} />
                  <FormLabel>Experience</FormLabel>
                </Flex>
                <Input
                  name="experience"
                  placeholder="Enter experience level"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  borderRadius="full"
                  focusBorderColor="purple.400"
                  shadow="sm"
                />
                <FormErrorMessage>{formik.errors.experience}</FormErrorMessage>
              </FormControl>

              {/* Location */}
              <FormControl isInvalid={formik.touched.location && formik.errors.location}>
                <Flex alignItems="center">
                  <Icon as={FaMapMarkerAlt} w={5} h={5} color="green.500" mr={2} />
                  <FormLabel>Location</FormLabel>
                </Flex>
                <Input
                  name="location"
                  placeholder="Enter job location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  borderRadius="full"
                  focusBorderColor="green.400"
                  shadow="sm"
                />
                <FormErrorMessage>{formik.errors.location}</FormErrorMessage>
              </FormControl>

              {/* Domain */}
              <FormControl isInvalid={formik.touched.domain && formik.errors.domain}>
                <Flex alignItems="center">
                  <Icon as={FaLaptopCode} w={5} h={5} color="teal.500" mr={2} />
                  <FormLabel>Domain</FormLabel>
                </Flex>
                <Textarea
                  name="domain"
                  placeholder="Enter job domain"
                  value={formik.values.domain}
                  onChange={formik.handleChange}
                  borderRadius="lg"
                  focusBorderColor="teal.400"
                  shadow="sm"
                  rows={3} // For multiline
                />
                <FormErrorMessage>{formik.errors.domain}</FormErrorMessage>
              </FormControl>

              {/* Salary */}
              <FormControl isInvalid={formik.touched.salary && formik.errors.salary}>
                <Flex alignItems="center">
                  <Icon as={FaRupeeSign} w={5} h={5} color="yellow.500" mr={2} />
                  <FormLabel>Salary</FormLabel>
                </Flex>
                <Input
                  name="salary"
                  placeholder="Enter salary range"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  borderRadius="full"
                  focusBorderColor="yellow.400"
                  shadow="sm"
                />
                <FormErrorMessage>{formik.errors.salary}</FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Button
                mt={6}
                colorScheme="teal"
                type="submit"
                isFullWidth
                isLoading={formik.isSubmitting}
                borderRadius="full"
                size="lg"
                bgGradient="linear(to-r, teal.400, blue.400)"
                _hover={{
                  bgGradient: "linear(to-r, teal.500, blue.500)",
                  boxShadow: "xl",
                }}
              >
                Post Job
              </Button>
            </Stack>
          </form>
        </Box>

        {/* Posted Jobs List */}
        <Heading as="h2" size="lg" mt={16} mb={8}>
          Your Posted Jobs
        </Heading>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          borderRadius="lg"
          shadow="lg"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Technology</Th>
                <Th>Skillset</Th>
                <Th>Experience</Th>
                <Th>Location</Th>
                <Th>Domain</Th>
                <Th>Salary</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {postedJobs.map((job) => (
                <Tr key={job._id}>
                  <Td>{job.technology}</Td>
                  <Td>{job.skillset}</Td>
                  <Td>{job.experience}</Td>
                  <Td>{job.location}</Td>
                  <Td>{job.domain}</Td>
                  <Td>{job.salary}</Td>
                  <Td>
                    <IconButton
                      icon={<FaEdit />}
                      mr={2}
                      onClick={() => console.log('Edit', job._id)}
                    />
                    <IconButton
                      icon={<FaTrashAlt />}
                      colorScheme="red"
                      onClick={() => handleDelete(job._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

export default JobPostForm;
