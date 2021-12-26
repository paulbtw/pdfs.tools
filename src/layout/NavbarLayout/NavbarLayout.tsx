import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Navbar } from './components';

interface NavbarLayoutProps {}

export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        transition='.3s ease'
        height='calc(100vh - 56px)'
        as='main'
        overflow='auto'
        bg={useColorModeValue('gray.50', 'gray.700')}
      >
        {children}
      </Box>
    </>
  );
};
