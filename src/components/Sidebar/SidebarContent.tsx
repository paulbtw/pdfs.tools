import React, { FC } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Icon,
  useDisclosure,
  Collapse,
  BoxProps,
} from '@chakra-ui/react';
import { AiOutlineMergeCells } from 'react-icons/ai';
import { FaSignature } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { VscPreview } from 'react-icons/vsc';
import { NavItem } from './NavItem';

export const SidebarContent: FC<BoxProps> = (props) => {
  const { onToggle, isOpen } = useDisclosure();

  return (
    <Box
      as='nav'
      pos='fixed'
      top='0'
      left='0'
      zIndex='sticky'
      h='full'
      pb='10'
      overflowX='hidden'
      overflowY='auto'
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth='1px'
      w='60'
      {...props}
    >
      <Flex px='4' py='5' align='center'>
        <Text
          fontSize='2xl'
          ml='2'
          color={useColorModeValue('brand.500', 'white')}
          fontWeight='semibold'
        >
          PDF Tools
        </Text>
      </Flex>
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
      >
        <NavItem icon={MdHome} to='/'>
          Home
        </NavItem>
        <NavItem icon={HiCode} onClick={() => onToggle()}>
          Tools
          <Icon
            as={MdKeyboardArrowRight}
            ml='auto'
            transform={isOpen ? 'rotate(90deg)' : undefined}
          />
        </NavItem>
        <Collapse in={isOpen}>
          <NavItem pl='12' py='2' icon={FaSignature} to='/pdf/sign'>
            Sign
          </NavItem>
          <NavItem pl='12' py='2' icon={VscPreview} to='/pdf/view'>
            View
          </NavItem>
          <NavItem pl='12' py='2' icon={AiOutlineMergeCells} to='/pdf/reorder'>
            Reorder
          </NavItem>
          <NavItem pl='12' py='2' icon={RiLockPasswordLine} to='/pdf/protect'>
            Protect
          </NavItem>
        </Collapse>
        {/* <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem> */}
      </Flex>
    </Box>
  );
};
