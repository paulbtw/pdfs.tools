import { FC, useCallback } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

interface AddMoreFilesProps {
  addNewFile: (f: File[]) => void;
}

export const AddMoreFiles: FC<AddMoreFilesProps> = ({ addNewFile }) => {
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
        addNewFile(acceptedFiles);
      }
    },
    [addNewFile, toast],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });

  return (
    <Button {...getRootProps()}>
      <input {...getInputProps()} />
      Add More Files
    </Button>
  );
};
