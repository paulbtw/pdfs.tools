import { FC, useCallback } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { useColorModeValue, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

interface DropProps {
  onLoaded: (files: File[]) => void;
}

export const Drop: FC<DropProps> = ({ onLoaded }) => {
  const toast = useToast();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast({
          title: 'File Error',
          description: 'No file found. Please try again.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      } else {
        onLoaded(acceptedFiles);
      }
    },
    [onLoaded, toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });
  return (
    <Box
      w='90%'
      border='2px'
      borderStyle='dashed'
      h='10rem'
      borderColor={useColorModeValue('brand.700', 'brand.300')}
      display='flex'
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text>Drop the files here ...</Text>
      ) : (
        <Text>Drag n drop some files here, or click to select files</Text>
      )}
    </Box>
  );
};
