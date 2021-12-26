import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavLinkProps {
  to?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to = '/', children }) => {
  return (
    <NextLink href={to} passHref>
      <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default NavLink;
