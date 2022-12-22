import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const { toggleColorMode } = useColorMode();
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
        <Button colorScheme='teal' size='sm'>
          Log in
        </Button>
        <Button onClick={toggleColorMode} size='sm' mt={2}>
          Toggle Color
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
