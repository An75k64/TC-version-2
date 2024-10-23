import React, { useState, useRef, useEffect } from 'react';
import { Box, Heading, Text, Input, Button, Stack, Icon, VStack, HStack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaGraduationCap, FaClock, FaBuilding, FaTags,FaTools, FaBriefcase,  FaProjectDiagram, FaMoneyBillWave } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiSpeakFill } from "react-icons/ri";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces'),
  email: Yup.string().email('Invalid email').matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address').required('Email is required'),
  phone: Yup.string().matches(/^[6-9]\d{9}$/, "Phone Number must be valid").required('Phone number is required'),
  resume: Yup.mixed().required('Resume is required'),
});

export default function OpeningForm({ jobId, affiliateJobId, affiliateId }) {
  const isAffiliate = affiliateJobId ? true : false;
        
  const [message, setMessage] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchJobDetails = async () => {
        
        const id = isAffiliate ? affiliateJobId : jobId;

      if (!id) {
        console.error("No jobId or affiliateJobId provided");
        return;
      }

      try {
        const endpoint = isAffiliate 
          ? `${apiUrl}/api/affiliatejob/job/${id}` 
          : `${apiUrl}/api/cards/cards/${id}`;
        const response = await axios.get(endpoint);
        //console.log("Fetched job details:", response.data); // Log the fetched data
        setJobDetails(response.data);
       // console.log("Fetched job details:", response.data); // Log the fetched details
      } catch (error) {
        console.error("Error fetching job details:", error.response ? error.response.data : error.message);
        setMessage({ text: 'Failed to load job details.', type: 'error' }); // Set error message
      }
    };

    fetchJobDetails();
  }, [jobId, affiliateJobId, isAffiliate]);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;

    if (!file) {
      setMessage({ text: "No file selected.", type: "error" });
      return;
    }

    if (!allowedExtensions.exec(file.name)) {
      setMessage({ text: "Please upload a valid resume in .pdf or .doc/.docx format.", type: "error" });
      fileInputRef.current.value = "";
    } else {
      setFieldValue("resume", file);
    }
  };

  const handleSubmit = async (values, actions) => {
    const data = new FormData();
    data.append('name', values.name);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('resume', values.resume);
    data.append('jobId', isAffiliate ? affiliateJobId : jobId);
    const jobTitle = isAffiliate ? jobDetails?.jobTitle : jobDetails?.title; // Use optional chaining to safely access properties
   // console.log('Submitting job title:', jobTitle); // Log jobTitle for debugging
    data.append('jobTitle', jobTitle || 'Not specified'); // Use a default value if jobTitle is not available
    data.append('affiliateId', isAffiliate ? affiliateId : "");

    try {
      await axios.post(`${apiUrl}/api/job-applications/apply`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: 'Resume uploaded successfully!', type: 'success' });
      actions.resetForm();
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ text: 'Error uploading resume.', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    }
    actions.setSubmitting(false);
  };

  if (!jobDetails) {
    return <Text>Loading job details...</Text>;
  }

  return (
    <Box
      maxH="80vh"
      overflowY="auto"
      p={4}
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#4299E1',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#2B6CB0',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#E2E8F0',
          borderRadius: '10px',
        },
        scrollbarWidth: 'thin',
        scrollbarColor: '#4299E1 #E2E8F0',
      }}
    >
      <Formik 
        initialValues={{ name: '', email: '', phone: '', resume: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <Stack spacing={4} bg={'white'} rounded={'xl'} p={{ base: 4, sm: 6, md: 8 }}>
              {!isAffiliate &&(
                <>
                  <Heading fontSize="2xl" mb={4} textColor={"black"}>Job Description</Heading>
                   <Text fontSize="lg" mb={6}>{jobDetails.jobDescription}</Text>
                </>
              )}

                  
              

              {!isAffiliate && (
                <>
                  <Heading fontSize="2xl" mb={4}>Job Role</Heading>
                      <VStack align="start" spacing={2} mb={6}>
                        <HStack spacing={2}>
                          <Icon as={FaLocationDot} boxSize={5} color="purple.500" />
                          <Text color="gray.500">Work Location:</Text>
                          <Text>{jobDetails.location}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FaBuilding} boxSize={5} color="blue.500" />
                          <Text color="gray.500">Department:</Text>
                          <Text>{jobDetails.department}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FaTags} boxSize={5} color="green.500" />
                          <Text width="120px" color="gray.500">Role / Category:</Text>
                          <Text width="auto">{jobDetails.jobRole} & {jobDetails.roleCategory}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FaClock} boxSize={5} color="orange.500" />
                          <Text color="gray.500">Employment type:</Text>
                          <Text>{jobDetails.employmentType}</Text>
                        </HStack>
                      </VStack>
                </>
              )}


               {isAffiliate && (
                      <>
                        <Heading fontSize="2xl" mb={4}>Job Role</Heading>
                       <VStack align="start" spacing={2} mb={6}>
                          <HStack spacing={2}>
                            <Icon as={FaTools} boxSize={5} color="teal.500" />
                            <Text color="gray.500">Skillset:</Text>
                            <Text>{jobDetails.skillset}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Icon as={FaBriefcase} boxSize={5} color="red.500" />
                            <Text color="gray.500">Experience:</Text>
                            <Text>{jobDetails.experience}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Icon as={FaLocationDot} boxSize={5} color="purple.500" />
                            <Text color="gray.500">Work Location:</Text>
                            <Text>{jobDetails.location}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Icon as={FaProjectDiagram} boxSize={5} color="cyan.500" />
                            <Text color="gray.500">Domain:</Text>
                            <Text>{jobDetails.domain}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Icon as={FaMoneyBillWave} boxSize={5} color="yellow.500" />
                            <Text color="gray.500">Salary:</Text>
                            <Text>{jobDetails.salary}</Text>
                          </HStack>
                        </VStack>
                      </>
                    )}

              {!isAffiliate && (
                <>
                  <hr />
                  <Heading fontSize="2xl" mb={4}>Job Requirements</Heading>
                 <VStack align="start" spacing={2} mb={6}>
                        <HStack spacing={2}>
                          <Icon as={FaBriefcase} boxSize={5} color="red.500" />
                          <Text color="gray.500">Experience:</Text>
                          <Text>{jobDetails.experience}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FaGraduationCap} boxSize={5} color="blue.500" />
                          <Text color="gray.500">Education:</Text>
                          <Text>{jobDetails.education}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={RiSpeakFill} boxSize={5} color="green.500" />
                          <Text color="gray.500">English level:</Text>
                          <Text>{jobDetails.englishLevel}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={IoPerson} boxSize={5} color="purple.500" />
                          <Text color="gray.500">Gender:</Text>
                          <Text>{jobDetails.gender}</Text>
                        </HStack>
                      </VStack>
                </>
              )}

              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Full Name"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{ color: "gray.500" }}
                    size="lg"
                  />
                )}
              </Field>
              {errors.name && touched.name && (
                <Text color="red.500" textAlign="center">{errors.name}</Text>
              )}

              <Field name="email">
                {({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{ color: "gray.500" }}
                    size="lg"
                  />
                )}
              </Field>
              {errors.email && touched.email && (
                <Text color="red.500" textAlign="center">{errors.email}</Text>
              )}

              <Field name="phone">
                {({ field }) => (
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Phone Number"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{ color: "gray.500" }}
                    size="lg"
                  />
                )}
              </Field>
              {errors.phone && touched.phone && (
                <Text color="red.500" textAlign="center">{errors.phone}</Text>
              )}

              <Field name="resume">
                {({ field }) => (
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf, .doc, .docx"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    size="lg"
                  />
                )}
              </Field>
              {errors.resume && touched.resume && (
                <Text color="red.500" textAlign="center">{errors.resume}</Text>
              )}

              <Button
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit Application
              </Button>

              {message && (
                <Text textAlign="center" color={message.type === "success" ? "green.500" : "red.500"}>
                  {message.text}
                </Text>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
