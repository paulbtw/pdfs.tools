import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaMoon, FaSun } from 'react-icons/fa';
import NavLink from './NavLink';

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { t } = useTranslation();
  return (
    <Box transition='.3s ease'>
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
        <NavLink to='/pdfs/merge'>{t('Merge PDF')}</NavLink>
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
