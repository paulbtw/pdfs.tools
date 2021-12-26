import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

interface NavbarProps {
  onOpen: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpen }) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  return (
    <Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
      <Flex
        as='header'
        align='center'
        justify='space-between'
        w='full'
        px={4}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottomWidth='1px'
        borderColor={useColorModeValue('inherit', 'gray.700')}
        h={14}
      >
        <IconButton
          aria-label='Menu'
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={onOpen}
          icon={<FiMenu />}
          size='sm'
        />
        <Flex></Flex>
        <Flex align='center'>
          <IconButton
            size='md'
            fontSize='lg'
            aria-label={`Switch to ${text} mode`}
            variant='ghost'
            color='current'
            ml={{ base: '0', md: '3' }}
            onClick={toggleMode}
            icon={<SwitchIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
