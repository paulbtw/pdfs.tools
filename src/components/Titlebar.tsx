import { FC } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface TitlebarProps {
  title: string;
}

export const Titlebar: FC<TitlebarProps> = ({ title }) => {
  return (
    <Flex flex='0 0 100%' mb={4}>
      <Heading isTruncated>{title}</Heading>
    </Flex>
  );
};
