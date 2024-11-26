import React, { useState }from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
  Text,
  Textarea,
  useTheme,
  VStack,
  CloseButton
} from '@chakra-ui/react';


const apiUrl = import.meta.env.VITE_API_BASE_URL;
// Validation schema
const validationSchema = Yup.object({  
  companyName: Yup.string().required('Company Name is required'),
  industry: Yup.string().required('Industry Name is required'),
  location: Yup.object({
    street: Yup.string().required('Street is required'),
    landmark: Yup.string().optional(), // Landmark can be optional
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be a 6-digit number'),
  }).required('Location is required'),
  companySize: Yup.number().required('Company Size is required').positive().integer(),
  contactPerson:  Yup.string()
    .required('Person Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Person name can only contain alphabets'),
  contactEmail: Yup.string()
    .email('Invalid email address')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
    .required('Contact Person Email is required'),
  contactPhone: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[6-9]\d{9}$/, 'Mobile Number must be valid'),
  partnershipInterests: Yup.array().min(1, 'At least one Partnership Interests must be selected'),
    
});

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal"
];

const CompanyForm = () => {
  const theme = useTheme();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'
  const [filteredStates, setFilteredStates] = useState(indianStates); // Define filteredStates

  const formik = useFormik({
    initialValues: {
      companyName: '',
      industry: '',
      location: {
      street: '',
      landmark: '',
      state: '',
      city: '',
      pincode: '',
    },
      companySize: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      partnershipInterests: [],
      additionalInfo: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        //await axios.post('${apiUrl}/api/company/submit-company-form', values);

        await axios.post(`${apiUrl}/api/company/submit-company-form`, values);
        setMessage("Your company details have been submitted successfully.");
        setMessageType('success');
        
        formik.resetForm(); // Reset form fields after successful submission
      } catch (error) {
        setMessage(error.response?.data || "Unable to submit company details.");
        setMessageType('error');
        
      }
    }
  });


  return (

    <Box>
     {/* Hero Section with Background Animation */}
      <Box
        position="relative"
        overflow="hidden"
        py={24}
        textAlign="center"
        color="white"
       bgGradient="linear(to-r, #008080, #0083B0)"


      >
        <Container maxW="container.lg" position="relative" zIndex={1}>
          <Heading textColor={"blue.400"}  fontFamily={"ClashDisplay"} as="h1" size="2xl" mb={4} textShadow="2px 2px 4px rgba(0, 0, 0, 0.6)">
            Partner with TalentConnect
          </Heading>
          <Text fontSize="xl" mb={6} textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)">
            Enhance your hiring potential with top talent. Connect with us and transform your recruitment today!
          </Text>
          
        </Container>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={0}
          _before={{
            content: '""',
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 20%)',
            backgroundSize: '20px 20px',
            animation: 'moveBg 20s linear infinite',
          }}
        />
        <style>
          {`
            @keyframes moveBg {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(50%, 50%);
              }
            }
          `}
        </style>
      </Box>

      {/* Message Box */}
      {message && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          p={6}
          maxW="sm"
          borderWidth={1}
          borderRadius="md"
          borderColor={messageType === 'success' ? 'green.400' : 'red.400'}
          bgGradient={messageType === 'success' ? "linear(to-r, white, green.50)" : "linear(to-r, white, red.50)"}
          boxShadow="lg"
          textAlign="center"
          zIndex={1000}
        >
          <CloseButton position="absolute" top="8px" right="8px" onClick={() => setMessage(null)} />
          <Heading size="md" color={messageType === 'success' ? 'green.600' : 'red.600'} mb={4}>
            {messageType === 'success' ? 'Thank you!' : 'Error!'}
          </Heading>
          <Text color={messageType === 'success' ? 'green.600' : 'red.600'}>
            {message}
          </Text>
        </Box>
      )}
      {/* Form Section */}
      <Box
             p={8}
        maxW="lg"
        mx="auto"
        borderWidth={1}
        borderRadius="lg"
        borderColor={theme.colors.blue[400]}
        boxShadow="2xl"
        bgGradient="linear(to-r, white, blue.50)"
        mt={-10}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          
          opacity: 0.2,
          zIndex: -1,
        }}
      >
        <Text
          fontSize="2xl"
          mb={6}
          fontWeight="bold"
          textAlign="center"
          color="blue.400"
        >
          Submit Your Company Details
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            {/* Company Name */}
            <FormControl isInvalid={formik.touched.companyName && formik.errors.companyName}>
              <FormLabel fontWeight="bold">Company Name</FormLabel>
              <Input
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                placeholder="Enter company name"
              />
              <Text color="red.500" fontSize="sm">
                {formik.errors.companyName}
              </Text>
            </FormControl>

            {/* Industry */}
            <FormControl isInvalid={formik.touched.industry && formik.errors.industry}>
              <FormLabel fontWeight="bold">Industry</FormLabel>
              <Input
                name="industry"
                value={formik.values.industry}
                onChange={formik.handleChange}
                placeholder="Enter industry"
              />
              <Text color="red.500" fontSize="sm">
                {formik.errors.industry}
              </Text>
            </FormControl>

            {/* Location */}
                          <FormControl>
                <FormLabel fontWeight="bold">Location Details</FormLabel>
                <Flex direction="column" gap={4}>
                  {/* Street */}
                  <Box>
                    <FormLabel fontWeight="bold" htmlFor="street">Street</FormLabel>
                    <Input
                      name="location.street"
                      id="street"
                      value={formik.values.location.street}
                      onChange={formik.handleChange}
                      placeholder="Enter street"
                    />
                    <Text color="red.500" fontSize="sm">{formik.errors.location?.street}</Text>
                  </Box>

                  {/* Landmark */}
                  <Box>
                    <FormLabel fontWeight="bold" htmlFor="landmark">Landmark</FormLabel>
                    <Input
                      name="location.landmark"
                      id="landmark"
                      value={formik.values.location.landmark}
                      onChange={formik.handleChange}
                      placeholder="Enter landmark"
                    />
                    <Text color="red.500" fontSize="sm">{formik.errors.location?.landmark}</Text>
                  </Box>

                  {/* State with Searchable Dropdown */}
                  <Box>
                    <FormLabel fontWeight="bold" htmlFor="state">State</FormLabel>
                    <Input
                      id="state"
                      placeholder="Type to search state"
                      value={formik.values.location.state}
                      onChange={(e) => {
                        const value = e.target.value;
                        formik.setFieldValue("location.state", value);
                        setFilteredStates(
                          indianStates.filter((state) =>
                            state.toLowerCase().startsWith(value.toLowerCase())
                          )
                        );
                      }}
                    />
                    {filteredStates.length > 0 && (
                      <VStack
                        spacing={1}
                        mt={2}
                        maxH="150px"
                        overflowY="auto"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        boxShadow="sm"
                        bg="white"
                      >
                        {filteredStates.map((state) => (
                          <Box
                            key={state}
                            w="100%"
                            px={2}
                            py={1}
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                            onClick={() => {
                              formik.setFieldValue("location.state", state);
                              setFilteredStates([]); // Clear the dropdown after selection
                            }}
                          >
                            {state}
                          </Box>
                        ))}
                      </VStack>
                    )}
                    <Text color="red.500" fontSize="sm">{formik.errors.location?.state}</Text>
                  </Box>

                  {/* City */}
                  <Box>
                    <FormLabel fontWeight="bold" htmlFor="city">City</FormLabel>
                    <Input
                      name="location.city"
                      id="city"
                      value={formik.values.location.city}
                      onChange={formik.handleChange}
                      placeholder="Enter city"
                    />
                    <Text color="red.500" fontSize="sm">{formik.errors.location?.city}</Text>
                  </Box>

                  {/* Pincode */}
                  <Box>
                    <FormLabel fontWeight="bold" htmlFor="pincode">Pincode</FormLabel>
                    <Input
                      name="location.pincode"
                      id="pincode"
                      type="number"
                      value={formik.values.location.pincode}
                      onChange={formik.handleChange}
                      placeholder="Enter pincode"
                    
                    />
                    <Text color="red.500" fontSize="sm">{formik.errors.location?.pincode}</Text>
                  </Box>
                </Flex>
              </FormControl>


            {/* Company Size */}
            <FormControl isInvalid={formik.touched.companySize && formik.errors.companySize}>
              <FormLabel fontWeight="bold">Company Size</FormLabel>
              <Input
                type="number"
                name="companySize"
                value={formik.values.companySize}
                onChange={formik.handleChange}
                placeholder="Enter number of employees"
              />
              <Text color="red.500" fontSize="sm">
                {formik.errors.companySize}
              </Text>
            </FormControl>

            {/* Contact Person */}
            <FormControl isInvalid={formik.touched.contactPerson && formik.errors.contactPerson}>
              <FormLabel fontWeight="bold">Contact Person</FormLabel>
              <Input
                name="contactPerson"
                value={formik.values.contactPerson}
                onChange={formik.handleChange}
                placeholder="Enter contact person's name"
              />
              <Text color="red.500" fontSize="sm">
                {formik.errors.contactPerson}
              </Text>
            </FormControl>

            {/* Contact Email */}
            <FormControl isInvalid={formik.touched.contactEmail && formik.errors.contactEmail}>
              <FormLabel fontWeight="bold">Contact Email Address</FormLabel>
              <Input
                type="email"
                name="contactEmail"
                value={formik.values.contactEmail}
                onChange={formik.handleChange}
                placeholder="Enter email"
              />
              <Text color="red.500" fontSize="sm">
                {formik.errors.contactEmail}
              </Text>
            </FormControl>

            {/* Contact Phone */}
            <FormControl isInvalid={formik.touched.contactPhone && formik.errors.contactPhone}>
              <FormLabel fontWeight="bold">Contact Phone Number</FormLabel>
              <Input
                type="tel"
                name="contactPhone"
                 maxLength={10} 
                value={formik.values.contactPhone}
                onChange={formik.handleChange}
                placeholder="Enter phone number"
              />
              <Text color="red.500" fontSize="sm">
                {formik.errors.contactPhone}
              </Text>
            </FormControl>

            {/* Partnership Interests */}
            <FormControl isInvalid={formik.touched.partnershipInterests && formik.errors.partnershipInterests}>
              <FormLabel fontWeight="bold">Partnership Interests (Select all that apply)</FormLabel>
              <CheckboxGroup
                name="partnershipInterests"
                value={formik.values.partnershipInterests}
                onChange={(value) => formik.setFieldValue('partnershipInterests', value)}
              >
                <Stack spacing={2}>
                  <Checkbox value="Campus Drives">Campus Drives</Checkbox>
                  <Checkbox value="Staffing Solution">Staffing Solution</Checkbox>
                  <Checkbox value="Internship Programs">Internship Programs</Checkbox>
                  <Checkbox value="Part of Job Fairs">Part of Job Fairs</Checkbox>
                  <Checkbox value="Employee Training Programs">Employee Training Programs</Checkbox>
                  <Checkbox value="Employer Branding">Employer Branding</Checkbox>
                </Stack>
              </CheckboxGroup>
              <Text color="red.500" fontSize="sm">
                {formik.errors.partnershipInterests}
              </Text>
            </FormControl>

            {/* Additional Information */}
            <FormControl>
              <FormLabel fontWeight="bold">Additional Information</FormLabel>
              <Textarea
                name="additionalInfo"
                value={formik.values.additionalInfo}
                onChange={formik.handleChange}
                placeholder="Provide any additional information or specific requirements"
              />
            </FormControl>

            {/* Consent Notice */}
            <Text mt={4} fontSize="sm" color="gray.600">
              Note: By applying here you provide consent to share your personal data with TalentConnect. The personal data will be processed for employment purposes in line with TalentConnect's data protection practices.
            </Text>

            {/* Submit Button */}
            <Button
              mt={6}
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CompanyForm;
