import React from 'react';
import { Box, Image } from '@chakra-ui/react';
// Import the WhatsApp icon directly


const WhatsAppIcon = () => {
  // Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp number (including country code, without '+' sign)
  const phoneNumber = '7979863193';
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <Box
      as="a"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"
      bottom="4"
      right="4"
      zIndex="1000"
      borderRadius="full"
      overflow="hidden"
      width="70px"  // Ensure the Box width accommodates the Image
      height="50px" // Ensure the Box height accommodates the Image
    >
      <Image
       src= "https://talenetconnecttest.s3.ap-south-1.amazonaws.com/assets/icons8-whatsapp-100.png"
        alt="WhatsApp"
        boxSize="full"  // Ensures the image covers the Box dimensions
        objectFit="contain"  // Adjust this to 'contain' to avoid cropping
      />
    </Box>
  );
};

export default WhatsAppIcon;

