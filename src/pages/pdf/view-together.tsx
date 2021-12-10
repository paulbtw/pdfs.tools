import { Flex } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { Titlebar } from '../../components';

const ViewTogether: NextPage = () => {
  return (
    <>
      <Titlebar title='View Together' />
      <Flex flex='0 0 100%'></Flex>
    </>
  );
};

export default ViewTogether;
