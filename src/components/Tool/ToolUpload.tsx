import React, { useCallback } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';

interface ToolUploadProps {
  maxItemCount?: number;
  maxFileSize?: number;
  onLoaded?: (files: File[]) => void;
}

export const ToolUpload: React.FC<ToolUploadProps> = ({
  maxItemCount,
  maxFileSize,
  onLoaded,
}) => {
  const { t } = useTranslation();
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast({
          title: 'File Error',
          description: 'No file found. Please try again.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }

      if (maxItemCount && acceptedFiles.length > maxItemCount) {
        toast({
          title: 'File Error',
          description: `You can only upload ${maxItemCount} files.`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }

      if (maxFileSize) {
        acceptedFiles.forEach((file) => {
          if (file.size > maxFileSize) {
            toast({
              title: 'File Error',
              description: `File size is too large.`,
              status: 'warning',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          }
        });
      }

      if (onLoaded) onLoaded(acceptedFiles);
    },
    [maxFileSize, maxItemCount, toast, onLoaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });
  return (
    <>
      <Button size='lg' {...getRootProps()}>
        <input {...getInputProps()} />
        {t('Select PDF files')}
      </Button>
    </>
  );
};
