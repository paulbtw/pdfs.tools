import React, { FC } from 'react';
import { Flex, FlexProps, Icon, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavItemContentProps extends FlexProps {
  icon?: any;
}

const NavItemContent: FC<NavItemContentProps> = ({
  children,
  icon,
  ...rest
}) => {
  const iconColor = useColorModeValue('gray.600', 'gray.300');
  return (
    <Flex
      align='center'
      px='4'
      pl='4'
      py='3'
      cursor='pointer'
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200'),
      }}
      role='group'
      fontWeight='semibold'
      transition='.15s ease'
      {...rest}
    >
      {icon && (
        <Icon
          mx='2'
          boxSize='4'
          _groupHover={{
            color: iconColor,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon?: any;
  to?: string;
}

export const NavItem: FC<NavItemProps> = ({ icon, children, to, ...rest }) => {
  if (to) {
    return (
      <NextLink href={to} passHref>
        <div>
          <NavItemContent icon={icon} {...rest}>
            {children}
          </NavItemContent>
        </div>
      </NextLink>
    );
  }
  return (
    <NavItemContent icon={icon} {...rest}>
      {children}
    </NavItemContent>
  );
};
