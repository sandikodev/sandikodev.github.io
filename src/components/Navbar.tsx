// import { Button, WindmillContext } from '@roketid/windmill-react-ui'
// import { MoonIcon, SunIcon, TwitterIcon } from 'icons'
import {
  Button,
  chakra,
  Flex,
  HStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';

import Logo from '~/favicon/favicon.ico';

const CTA = 'Login';
const data = [
  {
    id: 1,
    label: 'Journey',
    href: '/journey',
  },
  {
    id: 2,
    label: 'Project',
    href: '/projects',
  },
  {
    id: 3,
    label: 'Contact',
    href: '/contact',
  },
  {
    id: 4,
    label: 'About',
    href: '/about',
  },
];

const Navbar = () => {
  // const { mode, toggleMode } = useContext(WindmillContext)
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.200', 'gray.700');

  return (
    <chakra.header
      id='header'
      className='mx-10 mt-2 flex items-center justify-between rounded-lg bg-gray-200 px-6 shadow-lg dark:bg-gray-700'
      background={formBackground}
    >
      <Flex
        w='100%'
        px='2'
        // py="1"
        align='center'
        justify='space-between'
      >
        <Link href='/'>
          <Image rounded={10} p={2} src={Logo.src} h='50px' alt='logo-app' />
        </Link>

        <HStack as='nav' spacing='5'>
          {data.map((menu, key) => (
            <Link href={menu.href} key={key}>
              <Button variant='nav' size='sm'>
                {' '}
                {menu.label}{' '}
              </Button>
            </Link>
          ))}
        </HStack>

        <HStack>
          <Link href='/login'>
            <Button size='sm'>{CTA}</Button>
          </Link>
          <Button onClick={toggleColorMode} size='sm' mt={2}>
            Mode {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
};

export default Navbar;

// const HideNavbar = () => {
//   return (
//     <nav className="flex items-center justify-between px-6 py-2 mx-10 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 shadow-lg">
//       <Link href="/" className="mr-10 text-gray-700 dark:text-gray-300 flex flex-row space-x-2 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 hover:rounded-lg p-2">
//         {/* <TwitterIcon className="w-6 h-6 text-purple-600" /> */}
//         <span className='font-bold uppercase'>{process.env.NEXT_PUBLIC_APP_NAME}</span>
//       </Link>
//       <ul className="flex space-x-4 mx-10 dark:text-gray-300">
//         {/* <li className='flex justify-center items-center'>
//           <button
//             className="rounded-md focus:outline-none focus:shadow-outline-purple p-2 hover:bg-gray-100 dark:hover:bg-gray-600/50"
//             onClick={(e) => {
//               toggleMode(e)
//               alert("fitur tema belum sempurna")
//             }}
//             aria-label="Toggle color mode"
//           >
//             {mode === 'dark' ? (
//               <SunIcon className="w-5 h-5" aria-hidden="true" />
//             ) : (
//               <MoonIcon className="w-5 h-5" aria-hidden="true" />
//             )}
//           </button>
//         </li> */}
//         {/* <li className='flex justify-center items-center'>
//           <Button onClick={toggleColorMode} size="sm" mt={2}>Toggle Color</Button>
//         </li> */}
//         <li>
//           <Button onClick={(e) => {
//             e.preventDefault
//             alert("Further Features not available yet!")
//           }}>Feature</Button>
//         </li>
//         <li>
//           <Link href="/contact">
//             <Button >Contact</Button>
//           </Link>
//         </li>
//         <li>
//           <Link href="/about" className='ml-5'>
//             <Button>About</Button>
//           </Link>
//         </li>
//         <li>
//           <Link href="/login" className='ml-5'>
//             <Button>Login</Button>
//           </Link>
//         </li>
//       </ul>
//     </nav >
//   )
// }
