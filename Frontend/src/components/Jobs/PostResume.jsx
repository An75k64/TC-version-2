import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  CloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import AnjaliImage from '../../assets/images/postResume/g1.jpeg';
import RohitImage from '../../assets/images/postResume/b1.jpeg';
import PriyaImage from '../../assets/images/postResume/g2.jpeg';
import AmitImage from '../../assets/images/postResume/b2.jpeg';
import NehaImage from '../../assets/images/postResume/g3.jpeg';

const avatars = [
  { name: "Anjali Sharma", url: AnjaliImage },
  { name: "Rohit Verma", url: RohitImage },
  { name: "Priya Singh", url: PriyaImage },
  { name: "Amit Patel", url: AmitImage },
  { name: "Neha Desai", url: NehaImage },
];


const apiUrl = import.meta.env.VITE_API_BASE_URL;


const Blur = (props) => {
  return (
    <Icon
      width={props.width}
      zIndex={props.zIndex}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email Id must be a valid"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/,"Phone Number must be valid")
    .required("Phone number is required"),
  resume: Yup.mixed().required("Resume is required"),
});

export default function PostResume() {
  const [message, setMessage] = useState(null);
  const [showError, setShowError] = useState(false); // Controls visibility of error popup
  const fileInputRef = useRef();

  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });
  const minSize = useBreakpointValue({ base: "44px", md: "60px" });
  const blurWidth = useBreakpointValue({
    base: "100%",
    md: "40vw",
    lg: "30vw",
  });
  const blurZIndex = useBreakpointValue({ base: -1, md: -1, lg: 0 });

 const handleFileChange = (event, setFieldValue) => {
  const file = event.currentTarget.files[0];
  const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;

  if (!file) {
    setMessage({ text: "No file selected.", type: "error" });
    return;
  }

  // Validate file extension
  if (!allowedExtensions.exec(file.name)) {
    setMessage({ text: "Please upload a valid resume in .pdf or .doc/.docx format.", type: "error" });
    fileInputRef.current.value = ""; // Reset the file input
  } else {
    setFieldValue("resume", file);
  }
};


  const handleSubmit = async (values, actions) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);
    data.append("resume", values.resume);

    try {
    await axios.post(`${apiUrl}/api/resumes/submit`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      setMessage({ text: "Resume uploaded successfully!", type: "success" });
      actions.resetForm(); // Resets the form fields except file input

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage({ text: "Error uploading resume.", type: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
    actions.setSubmitting(false);
  };

  return (
    <Box id="post-resume" position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Post Your Resume{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Get Noticed
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={avatarSize}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={minSize}
              minHeight={minSize}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              resume: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="name">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Full Name"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                    )}
                  </Field>
                  {errors.name && touched.name && (
                    <Text color="red.500">{errors.name}</Text>
                  )}

                  <Field name="email">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email ID"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                    )}
                  </Field>
                  {errors.email && touched.email && (
                    <Text color="red.500">{errors.email}</Text>
                  )}

                  <Field name="phone">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Phone number"
                        bg={"gray.100"}
                        border={0}

                        color={"gray.500"}
                        maxLength={10} // Ensures only 10 characters can be entered
                        pattern="\d*" // Ensures only digits can be entered
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                    )}
                  </Field>
                  {errors.phone && touched.phone && (
                    <Text color="red.500">{errors.phone}</Text>
                  )}

                           <Field name="resume">
                    {() => (
                      <div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(event) =>
                            handleFileChange(event, setFieldValue)
                          }
                          ref={fileInputRef}
                          style={{
                            padding: "8px",
                            border: "none",
                            borderRadius: "4px",
                            background: "#f7fafc",
                          }}
                        />
                        <Text fontSize="sm" color="gray.500" mt={2}>
                          Upload your resume in .pdf or .docx format.
                        </Text>
                      </div>
                    )}
                  </Field>
                  {errors.resume && touched.resume && (
                    <Text color="red.500">{errors.resume}</Text>
                  )}
                </Stack>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  fontFamily={"heading"}
                  mt={8}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                     bg: "blue.300", color:"white",
                     transform: "scale(1.05)"
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
             
          </Formik>
          {message && showError && (
  <Flex justifyContent="center" alignItems="center" mt={4}>
    <Alert
      status={message.type}
      rounded={"md"}
      w="100%"
      maxW="400px"
    >
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
        <AlertDescription>{message.text}</AlertDescription>
      </Box>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setShowError(false)}
      />
    </Alert>
  </Flex>
)}

        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-39}
        left={-100}
        zIndex={blurZIndex}
        style={{ filter: "blur(70px)" }}
        width={blurWidth}
      />
    </Box>
  );
}