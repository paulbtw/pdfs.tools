import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ToolHeader } from './ToolHeader';
import { ToolUpload } from './ToolUpload';

interface ToolProps {
  title: string;
  subtitle?: string;
  maxItemCount?: number;
  maxFileSize?: number;
  onLoaded?: (files: File[]) => void;
}

export const Tool: React.FC<ToolProps> = ({
  title,
  subtitle,
  maxItemCount,
  maxFileSize,
  onLoaded,
}) => {
  return (
    <Flex mt={8} wrap='wrap' justifyContent='center'>
      <ToolHeader title={title} subtitle={subtitle} />
      <ToolUpload
        maxItemCount={maxItemCount}
        maxFileSize={maxFileSize}
        onLoaded={onLoaded}
      />
    </Flex>
  );
};
