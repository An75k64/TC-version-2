import React, { useState, useEffect } from 'react';
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
  Text,
  Textarea,
  useTheme,
  useToast,
  CloseButton,
} from '@chakra-ui/react';

const apiUrl = import.meta.env.VITE_API_BASE_URL;



// Validation schema
const validationSchema = Yup.object({
  polytechnicCourses: Yup.array()
    .required('At least one Polytechnic/ITI/Diploma course must be selected'),
  ugCourses: Yup.array()
    .required('At least one UG course must be selected'),
  pgCourses: Yup.array()
    .required('At least one PG course must be selected'),

  collegeName: Yup.string()
    .required('College/Institution Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'College name can only contain alphabets'),

  location: Yup.string().required('Location is required'),

  studentsStrengthPolytechnic: Yup.number()
    .nullable()
    .test('required-polytechnic', 'Students Strength is required', function (value) {
      const { polytechnicCourses } = this.parent;
      const hasCourses = Array.isArray(polytechnicCourses) && 
                         polytechnicCourses.length > 0 && 
                         !polytechnicCourses.includes('No Courses Offered');
      return hasCourses ? (value !== null && value >= 1) : true; // Allow null if no courses are selected
    }),
  studentsStrengthUG: Yup.number()
    .nullable()
    .test('required-ug', 'Students Strength is required', function (value) {
      const { ugCourses } = this.parent;
      const hasCourses = Array.isArray(ugCourses) && 
                         ugCourses.length > 0 && 
                         !ugCourses.includes('No Courses Offered');
      return hasCourses ? (value !== null && value >= 1) : true;
    }),
  studentsStrengthPG: Yup.number()
    .nullable()
    .test('required-pg', 'Students Strength is required', function (value) {
      const { pgCourses } = this.parent;
      const hasCourses = Array.isArray(pgCourses) && 
                         pgCourses.length > 0 && 
                         !pgCourses.includes('No Courses Offered');
      return hasCourses ? (value !== null && value >= 1) : true;
    }),

  collegeEmail: Yup.string()
    .email('Invalid email address')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
    .required('College Email is required'),


  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[6-9]\d{9}$/, 'Mobile Number must be valid'),

  placementSeason: Yup.string()
    .required('Placement Season Duration is required')
    .matches(/^(0?[1-9]|1[0-2])\/\d{4}$/, 'Placement Season must be in MM/YYYY format'),

  upcomingEvents: Yup.string().required('Upcoming Student Engagements are required'),

  partnershipInterests: Yup.array()
    .min(1, 'At least one Partnership Interest must be selected'),
});


const CollegeForm = () => {
  const theme = useTheme();
  const toast = useToast();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  const formik = useFormik({
    initialValues: {
      polytechnicCourses: [],
      ugCourses: [],
      pgCourses: [],
      collegeName: '',
      location: '',
      studentsStrengthPolytechnic: '',
      studentsStrengthUG: '',
      studentsStrengthPG: '',
      collegeEmail: '',
      mobileNumber: '',
      placementSeason: '',
      upcomingEvents: '',
      partnershipInterests: []
    },
    validationSchema: validationSchema,

 onSubmit: async (values) => {
  // Check if all courses are 'No Courses Offered'
  if (isAllNoCourses()) {
    toast({
      title: 'Error',
      description: 'You cannot select "No Courses Offered" for all courses.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return; // Prevent form submission
  }

  // Validate student strength based on course selection
  const errors = {};

  // Check if each course type has courses selected and validate accordingly
  const validateStrength = (courses, strengthField, fieldName) => {
    if (
      Array.isArray(courses) &&
      courses.length > 0 &&
      !courses.includes('No Courses Offered') &&
      (values[strengthField] == null || values[strengthField] < 1)
    ) {
      errors[fieldName] = 'Students Strength is required';
    }
  };

  // Validate for each course type
  validateStrength(values.polytechnicCourses, 'studentsStrengthPolytechnic', 'studentsStrengthPolytechnic');
  validateStrength(values.ugCourses, 'studentsStrengthUG', 'studentsStrengthUG');
  validateStrength(values.pgCourses, 'studentsStrengthPG', 'studentsStrengthPG');

  // If there are validation errors, show toast and prevent submission
  if (Object.keys(errors).length > 0) {
    toast({
      title: 'Validation Error',
      description: Object.values(errors).join(', '),
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return; // Prevent form submission
  }

  // Proceed with form submission
  try {
    await axios.post(`${apiUrl}/api/college/submit-college-form`, values);
    setMessage("Your college details have been submitted successfully.");
    setMessageType('success');
    formik.resetForm();
  } catch (error) {
    const errorMsg = error.response?.data || "Unable to submit college details.";
    console.error(errorMsg); // Logging the error for debugging
    setMessage(errorMsg);
    setMessageType('error');
  }
}
});

// Effect to handle the error state when all courses are "No Courses Offered"
useEffect(() => {
  if (isAllNoCourses()) {
    formik.setFieldError('polytechnicCourses', 'You cannot select "No Courses Offered" for all courses.');
    formik.setFieldError('ugCourses', 'You cannot select "No Courses Offered" for all courses.');
    formik.setFieldError('pgCourses', 'You cannot select "No Courses Offered" for all courses.');
    
    // Optionally clear strength fields if no courses are selected
    formik.setFieldValue('studentsStrengthPolytechnic', null);
    formik.setFieldValue('studentsStrengthUG', null);
    formik.setFieldValue('studentsStrengthPG', null);
  }
}, [formik.values.polytechnicCourses, formik.values.ugCourses, formik.values.pgCourses]);

const isAllNoCourses = () => {
  return (
    formik.values.polytechnicCourses.includes('No Courses Offered') &&
    formik.values.ugCourses.includes('No Courses Offered') &&
    formik.values.pgCourses.includes('No Courses Offered')
  );
};

const handleCourseSelection = (value, courseType) => {
  if (value.includes('No Courses Offered')) {
    formik.setFieldValue(courseType, ['No Courses Offered']);
  } else {
    formik.setFieldValue(courseType, value);
  }

  // Uncheck all other boxes if "No Courses Offered" is selected
  if (value.includes('No Courses Offered')) {
    const otherCourses = value.filter(course => course !== 'No Courses Offered');
    if (otherCourses.length > 0) {
      formik.setFieldValue(courseType, ['No Courses Offered']);
    }
  }
};

const isNoCourseOffered = (courseType) => {
  return formik.values[courseType].includes('No Courses Offered');
};

  

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
          <Heading textColor={"blue.400"} fontFamily={"ClashDisplay"} as="h1" size="2xl" mb={4} textShadow="2px 2px 4px rgba(0, 0, 0, 0.6)">
            Partner with TalentConnect
          </Heading>
          <Text fontSize="xl" mb={6} textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)">
            Empower your students with the best career opportunities. Join our network today!
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
          color="blue.600"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
        >
          Submit Your College Details
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>

              {/* Polytechnic/ITI/Diploma Courses Multi-Select */}
              <FormControl isInvalid={formik.touched.polytechnicCourses && formik.errors.polytechnicCourses}>
                <FormLabel fontWeight="bold">Polytechnic/ITI/Diploma Courses Offered (Select all that apply)</FormLabel>
                <CheckboxGroup value={formik.values.polytechnicCourses} onChange={(value) => handleCourseSelection(value, 'polytechnicCourses')} >
                  <Stack spacing={2}>
                    <Checkbox value="No Courses Offered">No Courses Offered</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="Diploma in Engineering">Diploma in Engineering</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="Diploma in Pharmacy">Diploma in Pharmacy</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="Polytechnic in Mechanical Engineering">Polytechnic in Mechanical Engineering</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="Polytechnic in Civil Engineering">Polytechnic in Civil Engineering</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="ITI in Electrical">ITI in Electrical</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="ITI in Fitter">ITI in Fitter</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="ITI in Welding">ITI in Welding</Checkbox>
                    <Checkbox isDisabled={isNoCourseOffered('polytechnicCourses')} value="ITI in Electronics">ITI in Electronics</Checkbox>
                 
                  </Stack>
                </CheckboxGroup>
                <Text color="red.500" fontSize="sm">{formik.errors.polytechnicCourses}</Text>
              </FormControl>


            {/* UG Courses Multi-Select */}
            <FormControl isInvalid={formik.touched.ugCourses && formik.errors.ugCourses}>
              <FormLabel fontWeight="bold">UG Courses Offered (Select all that apply)</FormLabel>
              <CheckboxGroup
                 value={formik.values.ugCourses}
                 onChange={(value) => handleCourseSelection(value ,'ugCourses')}
              >
                <Stack spacing={2}>
                  <Checkbox value="No Courses Offered">No Courses Offered</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="B.Tech">B.Tech</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="BBA">BBA</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="BSc">BSc</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="BCA">BCA</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="BE">BE</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="BA">BA</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="BBM">BBM</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="PUC Science Combinations">PUC Science Combinations</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="PUC Humanities Combinations">PUC Humanities Combinations</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="PUC Commerce combinations">PUC Commerce combinations</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="B.Pharma">B.Pharma</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('ugCourses')} value="D.Pharma">D.Pharma</Checkbox>
                  
                </Stack>
              </CheckboxGroup>
              <Text color="red.500" fontSize="sm">{formik.errors.ugCourses}</Text>
            </FormControl>

            {/* PG Courses Multi-Select */}
            <FormControl isInvalid={formik.touched.pgCourses && formik.errors.pgCourses}>
              <FormLabel fontWeight="bold">PG Courses Offered (Select all that apply)</FormLabel>
              <CheckboxGroup
                value={formik.values.pgCourses}
                onChange={(value) => handleCourseSelection(value, 'pgCourses')}
              >
                <Stack spacing={2}>
                  <Checkbox value="No Courses Offered">No Courses Offered</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="M.Tech">M.Tech</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="MBA">MBA</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="MA">MA</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="MCA">MCA</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="ME">ME</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="MSc">MSc</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="MCom">MCom</Checkbox>
                  <Checkbox isDisabled={isNoCourseOffered('pgCourses')} value="M.Pharma">M.Pharma</Checkbox>
                  
                </Stack>
              </CheckboxGroup>
              <Text color="red.500" fontSize="sm">{formik.errors.pgCourses}</Text>
            </FormControl>

            {/* College/Institution Name */}
            <FormControl isInvalid={formik.touched.collegeName && formik.errors.collegeName}>
              <FormLabel fontWeight="bold">College/Institution Name</FormLabel>
              <Input
                name="collegeName"
                value={formik.values.collegeName}
                onChange={formik.handleChange}
                placeholder="Enter name"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.collegeName}</Text>
            </FormControl>

            {/* Location */}
            <FormControl isInvalid={formik.touched.location && formik.errors.location}>
              <FormLabel fontWeight="bold">Location</FormLabel>
              <Input
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                placeholder="Enter location"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.location}</Text>
            </FormControl>

            {/* Students Strength (Polytechnic/ITI/Diploma) */}
            <FormControl isDisabled={isNoCourseOffered('polytechnicCourses')} isInvalid={formik.touched.studentsStrengthPolytechnic && formik.errors.studentsStrengthPolytechnic}>
              <FormLabel fontWeight="bold">Students Strength (Polytechnic/ITI/Diploma)</FormLabel>
              <Input
                type="number"
                {...formik.getFieldProps('studentsStrengthPolytechnic')}
                disabled={isNoCourseOffered('polytechnicCourses')}
              />
              <Text color="red.500" fontSize="sm">{formik.errors.studentsStrengthPolytechnic}</Text>
            </FormControl>

            {/* Students Strength UG */}
            <FormControl isDisabled={isNoCourseOffered('ugCourses')} isInvalid={formik.touched.studentsStrengthUG && formik.errors.studentsStrengthUG}>
              <FormLabel fontWeight="bold">Students Strength (UG)</FormLabel>
               <Input
                type="number"
                {...formik.getFieldProps('studentsStrengthUG')}
                disabled={isNoCourseOffered('ugCourses')}
              />
              <Text color="red.500" fontSize="sm">{formik.errors.studentsStrengthUG}</Text>
            </FormControl>

            {/* Students Strength PG */}
            <FormControl isDisabled={isNoCourseOffered('pgCourses')} isInvalid={formik.touched.studentsStrengthPG && formik.errors.studentsStrengthPG}>
              <FormLabel fontWeight="bold">Students Strength (PG)</FormLabel>
              <Input
                type="number"
                {...formik.getFieldProps('studentsStrengthPG')}
                disabled={isNoCourseOffered('pgCourses')}
              />
              <Text color="red.500" fontSize="sm">{formik.errors.studentsStrengthPG}</Text>
            </FormControl>

            {/* College Email */}
            <FormControl isInvalid={formik.touched.collegeEmail && formik.errors.collegeEmail}>
              <FormLabel fontWeight="bold">College TPO/SPOC Email Address</FormLabel>
              <Input
                type="email"
                name="collegeEmail"
                value={formik.values.collegeEmail}
                onChange={formik.handleChange}
                placeholder="Enter email"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.collegeEmail}</Text>
            </FormControl>

            {/* Mobile Number */}
            <FormControl isInvalid={formik.touched.mobileNumber && formik.errors.mobileNumber}>
              <FormLabel fontWeight="bold">Mobile Number</FormLabel>
              <Input
                type="tel"
                name="mobileNumber"
                maxLength={10} 
                pattern="\d*"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                placeholder="Enter mobile number"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.mobileNumber}</Text>
            </FormControl>

            {/* Placement Season Duration */}
            <FormControl isInvalid={formik.touched.placementSeason && formik.errors.placementSeason}>
              <FormLabel fontWeight="bold">Placement Season Duration (Month and Year)</FormLabel>
              <Input
                name="placementSeason"
                value={formik.values.placementSeason}
                onChange={formik.handleChange}
                placeholder="E.g: 04/2025"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.placementSeason}</Text>
            </FormControl>

            {/* Upcoming Student Engagements */}
            <FormControl isInvalid={formik.touched.upcomingEvents && formik.errors.upcomingEvents}>
              <FormLabel fontWeight="bold">Upcoming Student Engagements</FormLabel>
              <Textarea
                name="upcomingEvents"
                value={formik.values.upcomingEvents} 
                onChange={formik.handleChange}
                placeholder="E.g: Job Fairs, Recruiter Sessions, Networking Events etc"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.upcomingEvents}</Text>
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
                <Checkbox value="Campus Placement">Campus Placement</Checkbox>
                <Checkbox value="Seminar">Seminar</Checkbox>
                <Checkbox value="Campus Branding">Campus Branding</Checkbox>
                <Checkbox value="Job Fairs">Job Fairs</Checkbox>
                <Checkbox value="Training Program">Training Program</Checkbox>
                
              </Stack>
            </CheckboxGroup>
            <Text color="red.500" fontSize="sm">{formik.errors.partnershipInterests}</Text>
          </FormControl>

            {/* Consent Notice */}
            <Text mt={4} fontSize="sm" color="gray.600">
              Note: By applying here you provide consent to share your personal data with TalentConnect. The personal data would be processed for employment purposes and would be within TalentConnect data protection notice. Read our Privacy Statement and Website Terms and Conditions for more information.
            </Text>

            {/* Submit Button */}
            <Button mt={6} type="submit" colorScheme="blue" size="lg" width="full" _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CollegeForm;
