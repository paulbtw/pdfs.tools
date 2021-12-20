import { FC } from 'react';
import { Box, Divider, Flex } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

interface OverlayControlsProps {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
  totalPages: number;
}

export const OverlayControls: FC<OverlayControlsProps> = ({
  hasPreviousPage,
  hasNextPage,
  previousPage,
  nextPage,
  currentPage = 0,
  totalPages = 0,
}) => {
  return (
    <Flex
      position='absolute'
      w='100%'
      justifyContent='center'
      h='0'
      bottom='30px'
      left='0px'
      zIndex='99'
      paddingLeft='240px'
    >
      <Flex
        height='42px'
        background='rgb(66,66,66)'
        borderRadius='4px'
        opacity='0.9'
        transform='auto'
        translateY='-25px'
      >
        <Flex alignItems='center' padding={1} color='white'>
          <IconButton
            icon={<GrFormPrevious size='1.5em' opacity={1} />}
            size='small'
            aria-label='next page'
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            onClick={previousPage}
            isDisabled={!hasPreviousPage}
          />
          <Box
            backgroundColor='whiteAlpha.200'
            px={2}
            borderLeft='1px solid rgb(66,66,66)'
            borderRight='1px solid rgb(66,66,66)'
          >
            {currentPage}
          </Box>
          <IconButton
            icon={<GrFormNext size='1.5em' opacity={1} />}
            aria-label='next page'
            size='small'
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            onClick={nextPage}
            isDisabled={!hasNextPage}
          />
          <Flex px={1}>of {totalPages}</Flex>
        </Flex>
        <Divider orientation='vertical' />
        <Flex width='100px'></Flex>
      </Flex>
    </Flex>
  );
};
