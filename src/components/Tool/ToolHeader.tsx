import React from 'react';
import { Flex, Heading } from '@chakra-ui/layout';

interface ToolHeaderProps {
  title: string;
  subtitle?: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <Flex direction='column' alignItems='center' w='100%'>
        <Heading as='h1' size='xl' isTruncated mb={4} fontWeight='semibold'>
          {title}
        </Heading>
        {subtitle && (
          <Heading as='h2' size='lg' isTruncated fontWeight='normal' mb={8}>
            {subtitle}
          </Heading>
        )}
      </Flex>
    </>
  );
};
