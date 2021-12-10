import { Flex } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { Titlebar } from '../../components';

const Sign: NextPage = () => {
  return (
    <>
      <Titlebar title='eSign a PDF' />
      <Flex flex='0 0 100%'></Flex>
    </>
  );
};

export default Sign;
