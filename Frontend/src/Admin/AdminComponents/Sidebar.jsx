import React from "react";
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaSchool, FaBuilding, FaBriefcase, FaPhone,  FaHandshake } from 'react-icons/fa'; // Import icons from react-icons
import { MdNotificationsActive } from "react-icons/md";
import { css } from "@emotion/react";

const Sidebar = ({ isOpen, onClose }) => {
  // Close sidebar when an item is clicked
  const handleClick = () => {
    onClose(); // Close sidebar
  };

  // Custom scrollbar styles
  const customScrollbar = css`
    &::-webkit-scrollbar {
      width: 8px; /* Width of the scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1; /* Track color */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #3182ce; /* Scrollbar thumb color */
      border-radius: 10px; /* Rounded scrollbar thumb */
      border: 3px solid #f1f1f1; /* Space around scrollbar thumb */
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #2b6cb0; /* Scrollbar thumb color on hover */
    }
  `;

  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="0"
      w={{ base: "full", md: "250px" }}
      h="full"
      bg="gray.200"
      color="black"
      transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
      transition="transform 0.3s ease-in-out"
      zIndex="1000"
      overflowY="auto"
      css={customScrollbar}
    >
      <VStack align="start" spacing={4} mt={6} px={4}>
        <NavLink 
          to="/admin/dashboard" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent', // Change to the desired color
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaTachometerAlt} mr={3} />
          <Text>Dashboard</Text>
        </NavLink>
        <NavLink 
          to="/admin/notification" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent', // Change to the desired color
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={MdNotificationsActive} mr={3} />
          <Text>Notification</Text>
        </NavLink>
        <NavLink 
          to="/admin/student" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaUser} mr={3} />
          <Text>Student</Text>
        </NavLink>
        <NavLink 
          to="/admin/college" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaSchool} mr={3} />
          <Text>College</Text>
        </NavLink>
        <NavLink 
          to="/admin/company" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaBuilding} mr={3} />
          <Text>Company</Text>
        </NavLink>
        <NavLink 
          to="/admin/post-job" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaBriefcase} mr={3} />
          <Text>Post a Job</Text>
        </NavLink>
           <NavLink 
          to="/admin/affiliate"  // New Affiliate route
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaHandshake} mr={3} />  {/* Icon for Affiliate tab */}
          <Text>Affiliate</Text>
        </NavLink>

        <NavLink 
          to="/admin/contact-support" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaPhone} mr={3} />
          <Text>Contact Support</Text>
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
