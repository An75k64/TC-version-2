import React from "react";
import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import logo from "../../assets/images/Logo/logo.png"; // Adjust the path to your logo image

const Logo = () => {
  return (
    
      <Box
        className="logo-container"
        position="relative"
        paddingBottom="0px"
        width="100px"
        height={useBreakpointValue({base:"40px" ,lg:"50px","xl":"55px","3xl":"80px"})}
        
      >
        <Image
          src={logo}
          alt="Logo"
          className="logo"
          width={{base:"50px" ,lg:"50px","xl":"55px" ,"3xl":"100px"}}
          marginLeft={"5px"}
          height="auto"
          objectFit="cover"
          transition="transform 0.3s ease-in-out"
        />
        
      </Box>
    
  );
};

export default Logo;