import React, { FC } from 'react';
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import { SidebarContent } from './SidebarContent';

export const Sidebar: FC = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box
      as='section'
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH='100vh'
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w='full' borderRight='none' />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
        <Container maxW='container.lg'>
          <Box
            as='main'
            p='4'
            display='flex'
            justifyContent='center'
            flexWrap='wrap'
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
