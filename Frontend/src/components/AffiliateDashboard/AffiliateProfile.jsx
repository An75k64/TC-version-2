import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  HStack,
  IconButton,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons for showing/hiding passwords
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path according to your project structure

const DetailRow = ({ label, value }) => (
  <HStack justify="space-between" py={2} borderBottom="1px" borderColor="gray.200">
    <Text fontWeight="bold">{label}:</Text>
    <Text>{value}</Text>
  </HStack>
);

const AffiliateProfile = () => {
  const { affiliateId } = useContext(AuthContext); // Get affiliateId from AuthContext
  const [affiliate, setAffiliate] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toast = useToast();

  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Use the API base URL from environment variables

  useEffect(() => {
    if (!affiliateId) return; // Ensure affiliateId exists before making the request

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/affiliate/profile/${affiliateId}`);
        const { affiliate } = response.data;
        setAffiliate(affiliate);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load profile information.",
          status: "error",
        });
      }
    };
    fetchProfile();
  }, [affiliateId, apiUrl, toast]);

  const handleChangePassword = async () => {
    try {
      if (!affiliateId) return;
      await axios.post(`${apiUrl}/api/affiliate/change-password`, {
        affiliateId,
        oldPassword,
        newPassword,
      });
      toast({
        title: "Success",
        description: "Password changed successfully!",
        status: "success",
      });
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to change password.",
        status: "error",
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Affiliate Profile</Heading>

      {/* Profile Details */}
      <Box mb={6}>
        <SimpleGrid columns={1} spacing={4}>
          <DetailRow label="Full Name" value={affiliate.fullName} />
          <DetailRow label="Email Address" value={affiliate.email} />
          <DetailRow label="Phone Number" value={affiliate.phoneNumber} />
          <DetailRow label="Company Name" value={affiliate.companyName} />
          <DetailRow label="Company Email" value={affiliate.companyEmail} />
          <DetailRow label="Designation" value={affiliate.designation} />
         {/* <DetailRow label="Affiliate ID" value={affiliate.id} /> */}
        </SimpleGrid>
      </Box>

      <Divider my={6} />

      {/* Change Password Section */}
      <Heading size="md" mb={4}>Change Password</Heading>
      <HStack spacing={6} width="100%" align="center">
        <FormControl flex="1">
          <FormLabel>Old Password</FormLabel>
          <HStack>
            <Input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              pr="4.5rem" // Add padding to the right for icon
            />
            <IconButton
              variant="link"
              icon={showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowOldPassword(!showOldPassword)}
              aria-label={showOldPassword ? "Hide password" : "Show password"}
              position="absolute"
              right="1"
              zIndex="1"
            />
          </HStack>
        </FormControl>

        <FormControl flex="1">
          <FormLabel>New Password</FormLabel>
          <HStack>
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              pr="4.5rem" // Add padding to the right for icon
            />
            <IconButton
              variant="link"
              icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
              position="absolute"
              right="1"
              zIndex="1"
            />
          </HStack>
        </FormControl>
      </HStack>

      <Button colorScheme="red" onClick={handleChangePassword} mt={4} width="full">
        Change Password
      </Button>
    </Box>
  );
};

export default AffiliateProfile;
