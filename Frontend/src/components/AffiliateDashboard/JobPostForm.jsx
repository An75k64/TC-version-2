import React, { useState, useEffect, useContext } from 'react';
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
import { FaLaptopCode, FaLightbulb, FaMapMarkerAlt, FaUserTie, FaRupeeSign, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  jobTitle: Yup.string().required('Job Title is required'),
  skillset: Yup.string().required('Skillset is required'),
  experience: Yup.string().required('Experience is required'),
  location: Yup.string().required('Location is required'),
  domain: Yup.string().required('Domain is required'),
  salary: Yup.string().required('Salary is required'),
});

const JobPostForm = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const { affiliateId } = useContext(AuthContext);
  const toast = useToast();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch posted jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/affiliateJob/${affiliateId}`);
        if (Array.isArray(response.data)) {
          setPostedJobs(response.data);
        } else {
          setPostedJobs([]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    if (affiliateId) {
      fetchJobs();
    }
  }, [affiliateId, apiUrl]);

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      skillset: '',
      experience: '',
      location: '',
      domain: '',
      salary: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!affiliateId) {
        toast({
          title: "Error",
          description: "Affiliate ID is required.",
          status: "error",
        });
        return;
      }

      try {
        const response = await axios.post(`${apiUrl}/api/affiliateJob`, {
          affiliateId,
          ...values,
        });

        toast({
          title: "Success",
          description: "Job posted successfully!",
          status: "success",
        });

        // Clear form fields
        formik.resetForm();
      //  setPostedJobs([...postedJobs, response.data]);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to post job.",
          status: "error",
        });
      }
    },
  });

  // Handle job delete
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      setPostedJobs((prevJobs) => prevJobs.filter(job => job._id !== jobId));
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
      <Container
        maxW={{ base: '100%', md: '90%', lg: '70%' }}
        px={{ base: 4, md: 8 }}
      >
        <Heading
          as="h1"
          size={{ base: 'lg', md: 'xl' }}
          mb={8}
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, pink.300)"
          bgClip="text"
        >
          Post a Job
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} mb={10} color="gray.600">
          Fill in the details below to share your job opportunity!
        </Text>

        <Box
          bg="white"
          p={{ base: 6, md: 8 }}
          borderRadius="lg"
          shadow="lg"
          borderColor="gray.200"
          borderWidth={1}
        >
          {/* Job Posting Form */}
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={5}>
              {/* Job Title */}
              <FormControl isInvalid={formik.touched.jobTitle && formik.errors.jobTitle}>
                <Flex alignItems="center">
                  <Icon as={FaLaptopCode} w={5} h={5} color="blue.500" mr={2} />
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Job Title</FormLabel>
                </Flex>
                <Textarea
                  name="jobTitle"
                  placeholder="Enter Job Title"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  borderRadius="lg"
                  focusBorderColor="blue.400"
                  shadow="sm"
                  rows={3}
                />
                <FormErrorMessage>{formik.errors.jobTitle}</FormErrorMessage>
              </FormControl>

              {/* Skillset */}
              <FormControl isInvalid={formik.touched.skillset && formik.errors.skillset}>
                <Flex alignItems="center">
                  <Icon as={FaLightbulb} w={5} h={5} color="pink.500" mr={2} />
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Skillset</FormLabel>
                </Flex>
                <Textarea
                  name="skillset"
                  placeholder="Enter required skills"
                  value={formik.values.skillset}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  borderRadius="lg"
                  focusBorderColor="pink.400"
                  shadow="sm"
                  rows={3}
                />
                <FormErrorMessage>{formik.errors.skillset}</FormErrorMessage>
              </FormControl>

              {/* Experience */}
              <FormControl isInvalid={formik.touched.experience && formik.errors.experience}>
                <Flex alignItems="center">
                  <Icon as={FaUserTie} w={5} h={5} color="purple.500" mr={2} />
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Experience</FormLabel>
                </Flex>
                <Input
                  name="experience"
                  placeholder="Enter experience level"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Location</FormLabel>
                </Flex>
                <Input
                  name="location"
                  placeholder="Enter job location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Domain</FormLabel>
                </Flex>
                <Textarea
                  name="domain"
                  placeholder="Enter job domain"
                  value={formik.values.domain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  borderRadius="lg"
                  focusBorderColor="teal.400"
                  shadow="sm"
                  rows={3}
                />
                <FormErrorMessage>{formik.errors.domain}</FormErrorMessage>
              </FormControl>

              {/* Salary */}
              <FormControl isInvalid={formik.touched.salary && formik.errors.salary}>
                <Flex alignItems="center">
                  <Icon as={FaRupeeSign} w={5} h={5} color="yellow.500" mr={2} />
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Salary</FormLabel>
                </Flex>
                <Input
                  name="salary"
                  placeholder="Enter salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  borderRadius="full"
                  focusBorderColor="orange.400"
                  shadow="sm"
                />
                <FormErrorMessage>{formik.errors.salary}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w="full"
                shadow="md"
                borderRadius="full"
                mt={4}
              >
                Post Job
              </Button>
            </Stack>
          </form>
        </Box>
        </Container>

         {/* Posted Jobs Table */}
      <Container maxW="container.lg" mt={16}>
        <Heading as="h2" size="lg" mb={8} fontWeight="bold" color="blue.500">
          Posted Jobs
        </Heading>
        <Table variant="simple" size="lg" bg="white" shadow="lg" borderRadius="md">
          <Thead bg="gray.100">
            <Tr>
               <Th>S.No</Th>
              <Th>Job Title</Th>
              <Th>Skillset</Th>
              <Th>Experience</Th>
              <Th>Location</Th>
              <Th>Domain</Th>
              <Th>Salary</Th>
              {/*<Th>Actions</Th> */} 
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(postedJobs) && postedJobs.length > 0 ? (
            postedJobs.map((job,index) => (
              <Tr key={job._id}>
                <Td>{index + 1}</Td>
                <Td>{job.jobTitle}</Td>
                <Td>{job.skillset}</Td>
                <Td>{job.experience}</Td>
                <Td>{job.location}</Td>
                <Td>{job.domain}</Td>
                <Td>{job.salary}</Td>
                  {/* <Td>
                    <Flex>
                      <IconButton
                        icon={<FaEdit />}
                        colorScheme="yellow"
                        mr={2}
                        onClick={() => console.log('Edit job', job._id)}
                      />
                      <IconButton
                        icon={<FaTrashAlt />}
                        colorScheme="red"
                        onClick={() => handleDelete(job._id)}
                      />
                    </Flex>
                  </Td> */} 
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="7" textAlign="center" fontStyle="italic" color="gray.500">
                      No jobs posted
                    </Td>
                  </Tr>
                )}

          </Tbody>
        </Table>
        
      </Container>
    </Box>
  );
};

export default JobPostForm;
 