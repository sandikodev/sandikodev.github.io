import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import Layout from '@/components/layout/Layout';

const Page = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex height='100vh' alignItems='center' justifyContent='center'>
      <Flex direction='column' background={formBackground} p={12} rounded={6}>
        <Heading mb={6} size='sm'>
          Log in
        </Heading>
        <Input
          placeholder='user@sandikodev.io'
          variant='filled'
          mb={3}
          type='email'
        />
        <Input placeholder='*******' variant='filled' mb={6} type='password' />
        <Button colorScheme='teal' size='sm' className='mb-2'>
          Log in
        </Button>
        <div className='flex flex-row space-x-2'>
          <Button colorScheme='teal' size='sm' className='basis-1/2'>
            by Github
          </Button>
          <Button colorScheme='teal' size='sm' className='basis-1/2'>
            by Facebook
          </Button>
        </div>
        <Button onClick={toggleColorMode} size='sm' mt={2}>
          {colorMode == 'light' ? 'Switch Dark' : 'Switch Light'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Page;

Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
