import { Flex, Link } from '@chakra-ui/react';
import { NextPage } from 'next';
import { Titlebar } from '../../components';

const Protect: NextPage = () => {
  return (
    <>
      <Titlebar title='Encrypt PDF' />
      <Flex flex='0 0 100%'>
        Waiting for{' '}
        <Link href='https://github.com/Hopding/pdf-lib/pull/1015'>Merge</Link>
      </Flex>
    </>
  );
};

export default Protect;
